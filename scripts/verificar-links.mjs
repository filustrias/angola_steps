// Verifica os links internos do site gerado (dist/).
// Corre automaticamente depois de `astro build` (ver package.json).
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const BASE = '/angola_steps';

async function ficheirosHtml(dir) {
  const saida = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) saida.push(...(await ficheirosHtml(p)));
    else if (e.name.endsWith('.html')) saida.push(p);
  }
  return saida;
}

async function existe(caminho) {
  try {
    const s = await stat(caminho);
    if (s.isFile()) return true;
    if (s.isDirectory()) return (await stat(join(caminho, 'index.html'))).isFile();
  } catch {}
  return false;
}

const partidos = [];
let total = 0;
for (const ficheiro of await ficheirosHtml(DIST)) {
  const html = await readFile(ficheiro, 'utf8');
  for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    total++;
    const semAncora = decodeURI(url.split('#')[0].split('?')[0]);
    if (semAncora !== BASE && !semAncora.startsWith(BASE + '/')) {
      partidos.push([ficheiro, url, `fora do prefixo ${BASE}`]);
      continue;
    }
    if (!(await existe(join(DIST, semAncora.slice(BASE.length))))) {
      partidos.push([ficheiro, url, 'não existe']);
    }
  }
}

if (partidos.length) {
  console.error(`\n${partidos.length} link(s) interno(s) partido(s):`);
  for (const [f, u, m] of partidos) console.error(`  ${relative(DIST, f)} -> ${u} (${m})`);
  process.exit(1);
}
console.log(`Links internos verificados: ${total}, nenhum partido.`);
