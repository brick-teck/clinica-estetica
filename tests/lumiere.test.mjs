import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';

function load() {
  assert.ok(existsSync('data.js'), 'A configuração central data.js deve existir');
  const context = vm.createContext({ window: {}, URL });
  vm.runInContext(readFileSync('data.js', 'utf8'), context);
  vm.runInContext(readFileSync('assets/js/utils.js', 'utf8'), context);
  return { data: context.window.clinicData, utils: context.window.Lumiere.utils, context };
}

test('demonstração não cria contato ou endereço reais por padrão', () => {
  const { data } = load();
  assert.equal(data.name, 'LUMIÈRE ESTÉTICA');
  for (const key of ['whatsapp', 'phone', 'instagram', 'address', 'mapUrl', 'mapEmbedUrl']) {
    assert.equal(data.contact[key], '');
  }
});

test('filtros exibem apenas a categoria escolhida e Todos restaura o catálogo', () => {
  const { data, utils } = load();
  assert.equal(utils.filterItems(data.treatments).length, 6);
  for (const category of ['faciais', 'corporais', 'bem-estar']) {
    const filtered = utils.filterItems(data.treatments, { category });
    assert.ok(filtered.length > 0);
    assert.ok(filtered.every(item => item.category === category));
  }
  assert.equal(utils.filterItems(data.treatments, { category: 'inexistente' }).length, 0);
});

test('WhatsApp não gera destino sem número e codifica a mensagem configurada', () => {
  const { data, utils } = load();
  for (const invalid of ['', '123', 'javascript:alert(1)', '5500000000000']) {
    assert.equal(utils.whatsappURL(invalid, data.contact.message), null);
  }
  const url = new URL(utils.whatsappURL('+55 (11) 99999-9999', data.contact.message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/5511999999999');
  assert.equal(url.searchParams.get('text'), 'Olá! Gostaria de saber mais sobre os atendimentos e agendar uma avaliação.');
});

test('mapa incorporado rejeita URLs de terceiros e HTML configurável é escapado', () => {
  const { utils } = load();
  assert.equal(utils.mapEmbedURL('https://example.com/maps/embed'), null);
  assert.equal(utils.mapEmbedURL('javascript:alert(1)'), null);
  assert.equal(utils.mapEmbedURL('https://www.google.com/maps/embed?pb=example'), 'https://www.google.com/maps/embed?pb=example');
  assert.equal(utils.escapeHTML('<script>"&'), '&lt;script&gt;&quot;&amp;');
});

test('marca personalizada aparece nas seções e nas informações demonstrativas', () => {
  const { data, context } = load();
  data.shortName = 'NOVA & CLARA';
  for (const file of ['assets/js/icons.js', 'assets/js/components.js', 'assets/js/pages/home.js']) vm.runInContext(readFileSync(file, 'utf8'), context);
  const html = context.window.Lumiere.home();
  assert.ok(html.includes('A essência da NOVA &amp; CLARA'));
  assert.ok(html.includes('A experiência NOVA &amp; CLARA'));
  assert.ok(context.window.Lumiere.components.dialogs().includes('Demonstração NOVA &amp; CLARA'));
});
