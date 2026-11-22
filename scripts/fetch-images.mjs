// Downloads real product photos from Wikimedia Commons (free, openly licensed)
// and wires them into the store.   Run:  npm run images
// - Only fills products that don't have a photo yet (re-run is safe).
// - Products it can't find keep the drawn illustration. Add those by hand (see README).
// - Credits are written to public/products/CREDITS.txt
import fs from 'node:fs';
import path from 'node:path';
import { products } from '../src/data/products.js';

const OUT = path.resolve('public/products');
const MAP = path.resolve('src/data/images.json');
const CREDITS = path.join(OUT, 'CREDITS.txt');
const UA = 'ConfamGadgetStore/1.0 (demo store; contact: hello@confamgadget.example)';
const API = 'https://commons.wikimedia.org/w/api.php';
const BAD = /logo|icon|diagram|screenshot|chart|map|poster|banner|ad[_ ]|advert|box|package|unboxing|crowd|store|shop|event|launch|ceremony|vs\b|comparison|\.svg|\.gif|\.pdf|\.webm|\.ogv/i;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(OUT, { recursive: true });
const map = fs.existsSync(MAP) ? JSON.parse(fs.readFileSync(MAP, 'utf8')) : {};

const clean = (s) => s.replace(/\(.*?\)/g, ' ').replace(/\b\d+\s?(GB|TB)\b/gi, ' ').replace(/\b(Kit|Black|Disc|Slim|Vlog Camera)\b/gi, ' ').replace(/["']/g, ' ').replace(/\s+/g, ' ').trim();
const variants = (p) => {
  const base = clean(p.name);
  const noBrand = base.replace(new RegExp('^' + p.brand + '\\s*', 'i'), '');
  return [...new Set([base, `${p.brand} ${noBrand.split(' ').slice(0, 3).join(' ')}`, base.split(' ').slice(0, 3).join(' ')])];
};

async function search(q) {
  const u = new URL(API);
  Object.entries({ action: 'query', generator: 'search', gsrsearch: q, gsrnamespace: 6, gsrlimit: 12, prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: 800, format: 'json', origin: '*' })
    .forEach(([k, v]) => u.searchParams.set(k, v));
  const r = await fetch(u, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const j = await r.json();
  return Object.values(j.query?.pages || {}).sort((a, b) => a.index - b.index);
}

function pick(pages, p) {
  const words = clean(p.name).toLowerCase().split(' ').filter((w) => w.length > 1);
  for (const pg of pages) {
    const ii = pg.imageinfo?.[0];
    if (!ii || !/^image\/(jpeg|png)$/.test(ii.mime) || BAD.test(pg.title)) continue;
    if (ii.width < 500 || ii.height < 400) continue;
    const t = pg.title.toLowerCase();
    const hits = words.filter((w) => t.includes(w)).length;
    if (hits >= Math.min(2, words.length)) return { pg, ii };
  }
  return null;
}

const strip = (h = '') => h.replace(/<[^>]+>/g, '').trim();
let ok = 0, miss = [];
for (const p of products) {
  if (map[p.slug]) continue;
  let found = null;
  try {
    for (const q of variants(p)) {
      found = pick(await search(q), p);
      await sleep(250);
      if (found) break;
    }
    if (!found) { miss.push(p.name); console.log('  no photo  ', p.name); continue; }
    const { pg, ii } = found;
    const img = await fetch(ii.thumburl || ii.url, { headers: { 'User-Agent': UA } });
    if (!img.ok) throw new Error('download ' + img.status);
    const ext = ii.mime === 'image/png' ? 'png' : 'jpg';
    fs.writeFileSync(path.join(OUT, `${p.slug}.${ext}`), Buffer.from(await img.arrayBuffer()));
    map[p.slug] = `/products/${p.slug}.${ext}`;
    const md = ii.extmetadata || {};
    fs.appendFileSync(CREDITS, `${p.name}: ${pg.title} | ${strip(md.Artist?.value)} | ${strip(md.LicenseShortName?.value)} | ${ii.descriptionurl || ''}\n`);
    fs.writeFileSync(MAP, JSON.stringify(map, null, 2));
    ok++; console.log('  photo     ', p.name, '<-', pg.title);
    await sleep(250);
  } catch (e) { miss.push(p.name); console.log('  error     ', p.name, e.message); }
}
console.log(`\nDone. ${ok} new photos, ${Object.keys(map).length}/${products.length} products have photos.`);
if (miss.length) console.log('Still using drawings for:\n - ' + miss.join('\n - '));
