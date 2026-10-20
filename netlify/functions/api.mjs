// API del Baby Shower de Amanda: reservas de regalos, confirmaciones y panel de organizador.
import { getStore } from "@netlify/blobs";
const catalog = {"g002": {"qty": 2, "name": "Pañales BeBaby Premium talla P 80 u"}, "g003": {"qty": 5, "name": "Pañales BeBaby Premium talla M 80 u"}, "g004": {"qty": 5, "name": "Pañales BeBaby Premium talla G 72 u"}, "g091": {"qty": 5, "name": "Pañales BeBaby Premium talla XG 56 u"}, "g005": {"qty": 5, "name": "Toallitas húmedas Be Water, caja 12 paquetes (720 u)"}, "g006": {"qty": 1, "name": "Crema pañal de caléndula 75 ml"}, "g007": {"qty": 1, "name": "Mudador portátil con cabecera"}, "g008": {"qty": 1, "name": "Basurero de Pañales Sangenic"}, "g010": {"qty": 1, "name": "Nail Snail, Cortaúñas 3 en 1"}, "g011": {"qty": 1, "name": "Pack Cepillo y Peineta"}, "g012": {"qty": 1, "name": "Termómetro infrarrojo frente/oído Momcozy"}, "g013": {"qty": 1, "name": "Aspirador nasal eléctrico Balia con 4 boquillas de silicona"}, "g015": {"qty": 1, "name": "Kit de cuidado: cortaúñas, cepillo suave, aspirador manual, tijera y lima"}, "g016": {"qty": 1, "name": "Bañera Flexi 3 en 1 plegable + soporte Bebesit"}, "g017": {"qty": 1, "name": "Termómetro de baño y dormitorio Flor"}, "g018": {"qty": 1, "name": "Toalla con capucha Conejo Bebesit"}, "g019": {"qty": 1, "name": "Shampoo y gel de baño bebé 500 ml Botanical"}, "g020": {"qty": 1, "name": "Leche corporal de caléndula 200 ml"}, "g021": {"qty": 1, "name": "Esponja de mar natural"}, "g022": {"qty": 1, "name": "Elefante embudo de baño Yookidoo"}, "g023": {"qty": 1, "name": "Body manga corta Tutti-Frutti (precio por unidad)"}, "g025": {"qty": 1, "name": "Osito (pilucho) French Terry Corazones"}, "g026": {"qty": 1, "name": "Pijama suave 70 cm (3–6 meses)"}, "g027": {"qty": 1, "name": "Pijama suave 80 cm (6–12 meses)"}, "g028": {"qty": 1, "name": "Pack de 8 bodys manga larga 9–12 meses"}, "g029": {"qty": 1, "name": "Tripack calcetines Flower niña"}, "g030": {"qty": 1, "name": "Gorro Oso niña"}, "g032": {"qty": 1, "name": "Chaqueta tejida con forro de chiporro"}, "g033": {"qty": 1, "name": "Parka sin manga con chiporro niña"}, "g034": {"qty": 1, "name": "Traje de baño con pañal reutilizable lila flores"}, "g035": {"qty": 1, "name": "Baberos con cuello, pack de 3"}, "g036": {"qty": 1, "name": "Pantufla Conejito niña"}, "g037": {"qty": 1, "name": "Cuna colecho Cozy con colchón, mosquitero y canasto Rosa"}, "g038": {"qty": 1, "name": "Colchón de espuma para cuna 70x140 cm"}, "g039": {"qty": 1, "name": "Pack sábana bajera cuna 70x140 Blanca"}, "g040": {"qty": 1, "name": "Protector de Colchón Impermeable 70x140"}, "g041": {"qty": 1, "name": "GULDVÄVARE saco de dormir 0–6 meses"}, "g042": {"qty": 1, "name": "Pack 2 tutos de algodón 90×90 cm"}, "g043": {"qty": 1, "name": "TROLLDOM manta acolchada 96x96 cm"}, "g044": {"qty": 1, "name": "Baby Monitor Lite SoyMomo"}, "g045": {"qty": 1, "name": "Móvil proyector 3 en 1 Rosado"}, "g046": {"qty": 1, "name": "SoyMomo Dreams: luz de noche y ruido blanco"}, "g047": {"qty": 1, "name": "Cojín de lactancia Nubes con funda removible lavable"}, "g048": {"qty": 1, "name": "Extractor de leche doble manos libres Balia"}, "g049": {"qty": 3, "name": "Bolsa para Leche Materna 50 unidades Momcozy"}, "g050": {"qty": 3, "name": "Discos absorbentes de lactancia 60 u"}, "g051": {"qty": 1, "name": "Crema de lanolina para pezones HPA 40 g"}, "g052": {"qty": 1, "name": "Mamadera Natural Response de vidrio borosilicato 120 ml"}, "g093": {"qty": 1, "name": "Mamadera Natural Response de vidrio 240 ml"}, "g053": {"qty": 1, "name": "Esterilizador eléctrico a vapor para mamaderas y accesorios"}, "g092": {"qty": 1, "name": "Calentador de mamaderas y alimentos 4 en 1"}, "g054": {"qty": 1, "name": "Escobilla limpia mamaderas Deluxe"}, "g055": {"qty": 1, "name": "Chupete Avent Ultra Start (pack)"}, "g056": {"qty": 1, "name": "Silla de comer Steps Rosada"}, "g057": {"qty": 1, "name": "Set alimentación Elefante de silicona"}, "g058": {"qty": 1, "name": "Vaso boquilla blanda Transition 4m 150 ml"}, "g059": {"qty": 1, "name": "Baberos de silicona Rosa, pack de 2"}, "g061": {"qty": 1, "name": "Termo para comida B.box"}, "g062": {"qty": 1, "name": "Coche Travel System Bari Infanti"}, "g063": {"qty": 1, "name": "Silla nido vibradora Rosado"}, "g064": {"qty": 1, "name": "Silla de auto convertible Isofix Supra 360º"}, "g065": {"qty": 1, "name": "Portabebés Swift Classic Infantino"}, "g066": {"qty": 1, "name": "Bolso maternal mudador Beige Bebesit"}, "g067": {"qty": 1, "name": "Saquito de invierno universal para coche"}, "g068": {"qty": 1, "name": "Sombrilla para coche UPF50+ universal"}, "g069": {"qty": 1, "name": "Cobertor de lluvia universal para coche"}, "g070": {"qty": 1, "name": "Mudador anatómico 9 cm de alto"}, "g071": {"qty": 1, "name": "Cesta organizadora rectangular"}, "g072": {"qty": 1, "name": "Canasto de algodón para ropa"}, "g074": {"qty": 1, "name": "LEN cortinas 1 par, lunares 120x300 cm"}, "g076": {"qty": 1, "name": "Gimnasio interactivo alfombra Pond Pals"}, "g077": {"qty": 1, "name": "Sonajeros mordedores Animales Infantino"}, "g078": {"qty": 1, "name": "Mordedor Sophie La Girafe"}, "g079": {"qty": 1, "name": "GRÖNFINK libro con ilustraciones"}, "g080": {"qty": 1, "name": "Torre pulpo Montessori de silicona"}, "g081": {"qty": 1, "name": "Corral de estimulación Pop-up con pelotas"}, "g082": {"qty": 1, "name": "SANDBI alfombra de actividades 100x100 cm"}, "g084": {"qty": 1, "name": "PATRULL protectores de enchufes (12 u)"}, "g085": {"qty": 1, "name": "UNDVIKA seguro para cajones (2 u)"}, "g086": {"qty": 1, "name": "Reja de seguridad doble seguro 75 a 82 cm"}, "g087": {"qty": 1, "name": "UNDVIKA protectores de esquina (8 u)"}, "g088": {"qty": 1, "name": "Álbum, libro de recuerdos del bebé"}, "g089": {"qty": 1, "name": "Lata recuerdo de huella bebé"}, "g090": {"qty": 1, "name": "Marco recuerdo fotos y huella triple"}, "g101": {"qty": 1, "name": "Colchón antirreflujo Snooze 84x50x5 cm (colecho) Infanti"}, "g102": {"qty": 1, "name": "Espejo retrovisor Magnum Infanti"}, "g103": {"qty": 3, "name": "Líquido limpia mamaderas y accesorios 700 ml"}, "g104": {"qty": 1, "name": "Secador de mamaderas Nube Gris"}, "g105": {"qty": 1, "name": "Kit cepillos limpia mamaderas Rosado"}, "g106": {"qty": 1, "name": "Cinturón de embarazo y postparto"}, "g107": {"qty": 1, "name": "Parches de hidrogel para pezones (4 u)"}, "g108": {"qty": 1, "name": "Pack Isdin Baby Naturals: shampoo + pomada Nutraisdin"}, "g109": {"qty": 1, "name": "Lima de uñas eléctrica Bebe Confort"}, "g110": {"qty": 1, "name": "RÅSKOG carrito organizador blanco"}, "g111": {"qty": 1, "name": "Foular portabebé de tela Opaline"}};

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
