import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(path.join(dir, item.name)) : [path.join(dir, item.name)]);
const files = ['data.js', ...walk('assets/js'), ...walk('scripts'), ...walk('tests')];
for (const file of files.filter(file => /\.(m?js)$/.test(file))) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, `${file}: ${result.stderr}`);
}
const context = vm.createContext({ window: {}, URL });
for (const file of ['data.js', 'assets/js/utils.js', 'assets/js/icons.js', 'assets/js/components.js', 'assets/js/pages/home.js']) vm.runInContext(readFileSync(file, 'utf8'), context);
const data = context.window.clinicData;
for (const collection of [data.treatments, data.professionals]) assert.equal(new Set(collection.map(item => item.id)).size, collection.length, 'IDs duplicados');
for (const item of data.treatments) assert.ok(data.categories.some(category => category.slug === item.category), `Categoria desconhecida: ${item.id}`);
let references = 0;
for (const html of [readFileSync('index.html', 'utf8'), readFileSync('404.html', 'utf8')]) {
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|tel:|#)/.test(url)) continue;
    assert.ok(existsSync(url.split('?')[0]), `Arquivo ausente: ${url}`); references++;
  }
  assert.ok(!/href="#"/.test(html));
}
const index = readFileSync('index.html', 'utf8');
const allIds = [...index.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(allIds).size, allIds.length, 'IDs HTML duplicados');
assert.ok(index.includes('Demonstração independente'));
assert.ok(!index.includes('type="module"'), 'A abertura direta precisa de scripts clássicos');
assert.ok(readFileSync('sitemap.xml', 'utf8').includes(data.siteUrl));
assert.ok(existsSync('.nojekyll'));
console.log(`${files.length} arquivos JavaScript válidos; ${references} referências locais verificadas; configuração e HTML consistentes.`);
