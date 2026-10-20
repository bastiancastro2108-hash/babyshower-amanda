// API del Baby Shower de Amanda: reservas de regalos, confirmaciones y panel de organizador.
import { getStore } from "@netlify/blobs";
import catalog from "./catalog.json" with { type: "json" };

const PIN = () => (process.env.ADMIN_PIN || "0711").trim();
const store = () => getStore({ name: "babyshower-amanda", consistency: "strong" });

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const clean = (v, max = 80) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
const slug = (s) =>
  String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

async function readDoc(key) {
  const r = await store().getWithMetadata(key, { type: "json" });
  return r ? { data: r.data || {}, etag: r.etag } : { data: {}, etag: null };
}

// Escritura con reintento: solo guarda si nadie cambió el documento entre la lectura y la escritura.
async function updateDoc(key, fn) {
  for (let i = 0; i < 6; i++) {
    const { data, etag } = await readDoc(key);
    const result = fn(data);
    if (result && result.error) return result;
    const opts = etag ? { onlyIfMatch: etag } : { onlyIfNew: true };
    const res = await store().setJSON(key, data, opts);
    if (!res || res.modified !== false) return { ok: true, data, result };
    await new Promise((r) => setTimeout(r, 60 + Math.random() * 120));
  }
  return { error: "busy" };
}

const usedOf = (list) => (list || []).reduce((s, t) => s + (+t.n || 1), 0);

export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/?/, "");
  let body = {};
  if (req.method === "POST") {
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
  }

  // Estado público: cuántas unidades de cada regalo ya están reservadas (sin nombres).
  if (path === "state" && req.method === "GET") {
    const { data } = await readDoc("reservas");
    const used = {};
    for (const [id, list] of Object.entries(data)) used[id] = usedOf(list);
    return json({ used, at: Date.now() });
  }

  if (path === "reserve" && req.method === "POST") {
    const id = clean(body.id, 40);
    const name = clean(body.name, 60);
    const n = Math.max(1, Math.min(20, Math.round(+body.n || 1)));
    const item = catalog[id];
    if (!item) return json({ error: "unknown_gift" }, 404);
    if (!name) return json({ error: "name_required" }, 400);
    const out = await updateDoc("reservas", (data) => {
      const list = data[id] || [];
      const left = item.qty - usedOf(list);
      if (left < n) return { error: "not_enough", left: Math.max(0, left) };
      const ex = list.find((t) => slug(t.name) === slug(name));
      if (ex) { ex.n = (+ex.n || 1) + n; ex.at = Date.now(); }
      else list.push({ name, n, at: Date.now() });
      data[id] = list;
      return { left: left - n };
    });
    if (out.error === "not_enough") return json({ error: "not_enough", left: out.left }, 409);
    if (out.error) return json({ error: out.error }, 503);
    return json({ ok: true, left: out.result.left, used: usedOf(out.data[id]) });
  }

  if (path === "rsvp" && req.method === "POST") {
    const name = clean(body.name, 60);
    if (!name) return json({ error: "name_required" }, 400);
    const att = body.att === "no" ? "no" : "si";
    const rec = {
      name,
      att,
      adults: att === "si" ? Math.max(0, Math.min(30, +body.adults || 0)) : 0,
      kids: att === "si" ? Math.max(0, Math.min(30, +body.kids || 0)) : 0,
      msg: clean(body.msg, 500),
      at: Date.now(),
    };
    const key = slug(name) || "invitado-" + Date.now();
    const out = await updateDoc("rsvps", (data) => { data[key] = { ...(data[key] || {}), ...rec }; });
    if (out.error) return json({ error: out.error }, 503);
    return json({ ok: true });
  }

  if (path === "admin" && req.method === "POST") {
    if (clean(body.pin, 20) !== PIN()) {
      await new Promise((r) => setTimeout(r, 600));
      return json({ error: "bad_pin" }, 401);
    }
    const action = body.action || "list";
    if (action === "unreserve") {
      const id = clean(body.id, 40), who = slug(body.name || "");
      const out = await updateDoc("reservas", (data) => {
        data[id] = (data[id] || []).filter((t) => slug(t.name) !== who);
        if (!data[id].length) delete data[id];
      });
      if (out.error) return json({ error: out.error }, 503);
    }
    if (action === "delrsvp") {
      const key = slug(body.name || "");
      const out = await updateDoc("rsvps", (data) => { delete data[key]; });
      if (out.error) return json({ error: out.error }, 503);
    }
    const [res, rs] = await Promise.all([readDoc("reservas"), readDoc("rsvps")]);
    return json({ reservas: res.data, rsvps: rs.data, catalog });
  }

  return json({ error: "not_found" }, 404);
};

export const config = { path: "/api/*" };
