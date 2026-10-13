import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const library = process.env.PLAYWRIGHT_MODULE || path.join(process.env.TEMP, 'essentia-qa/node_modules/playwright-core/index.mjs');
const { chromium } = await import(pathToFileURL(library));
const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const base = process.env.QA_URL || 'http://127.0.0.1:4175';
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [], checks = [];
page.on('pageerror', error => errors.push(String(error)));
async function check(label, run) { await run(); checks.push(label); console.log('PASS ' + label); }
await mkdir('artifacts', { recursive: true });
try {
  await page.goto(base);
  await check('hero e seis tratamentos, antes da seção Sobre', async () => {
    assert.equal(await page.locator('.treatment-card').count(), 6);
    assert.equal(await page.locator('main h1').count(), 1);
    assert.ok((await page.locator('h1').innerText()).includes('beleza'));
    assert.equal(await page.locator('main > section').nth(1).getAttribute('id'), 'tratamentos');
  });
  await check('filtros por categoria e restauração de Todos', async () => {
    for (const [label, count] of [['Faciais', 3], ['Corporais', 2], ['Bem-estar', 1], ['Todos', 6]]) {
      await page.getByRole('button', { name: label, exact: true }).click();
      assert.equal(await page.locator('.treatment-card').count(), count);
      assert.equal(await page.getByRole('button', { name: label, exact: true }).getAttribute('aria-pressed'), 'true');
    }
  });
  await check('detalhe de tratamento, agendamento demonstrativo e foco restaurado', async () => {
    const opener = page.locator('[data-treatment]').first();
    await opener.click();
    assert.equal(await page.locator('#detail-dialog').isVisible(), true);
    assert.ok((await page.locator('#detail-dialog').innerText()).includes('Limpeza de pele'));
    await page.keyboard.press('Escape');
    assert.equal(await opener.evaluate(el => el === document.activeElement), true);
    await page.locator('.header-book').click();
    assert.equal(await page.locator('#appointment-dialog').isVisible(), true);
    assert.ok((await page.locator('#appointment-dialog').innerText()).includes('Nenhum agendamento'));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.header-book').evaluate(el => el === document.activeElement), true);
  });
  await check('lightbox navega, fecha com Escape e devolve foco', async () => {
    const trigger = page.locator('[data-gallery]').first(); await trigger.click();
    assert.equal(await page.locator('#gallery-dialog').isVisible(), true);
    await page.keyboard.press('ArrowRight');
    assert.ok((await page.locator('#gallery-caption').innerText()).includes('Luz e acolhimento'));
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Escape');
    assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
  });
  await check('agendamento pelo detalhe preserva o retorno ao card', async () => {
    const trigger = page.locator('[data-treatment]').first();
    await trigger.click(); await page.locator('#detail-dialog [data-book]').click();
    assert.equal(await page.locator('#detail-dialog').isVisible(), false);
    assert.equal(await page.locator('#appointment-dialog').isVisible(), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#appointment-dialog').evaluate(dialog => dialog.contains(document.activeElement)), true);
    await page.keyboard.press('Escape');
    assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
  });
  await check('WhatsApp, Instagram, telefone e mapa usam somente os canais configurados', async () => {
    const configured = await browser.newPage();
    await configured.addInitScript(() => { window.open = url => { window.testOpenedURL = url; }; });
    await configured.route('**/data.js', async route => {
      const response = await route.fetch();
      await route.fulfill({ response, body: (await response.text()) + `\nObject.assign(window.clinicData.contact, {whatsapp:'5511999999999',phone:'+55 (11) 99999-9999',instagram:'https://www.instagram.com/contato-de-teste/',address:'Endereço confirmado no cenário de teste',hours:'Horários confirmados no cenário de teste',mapUrl:'https://www.google.com/maps',mapEmbedUrl:'https://www.google.com/maps/embed?pb=teste'});` });
    });
    await configured.route('https://www.google.com/maps/embed**', route => route.fulfill({ contentType: 'text/html', body: '<html lang="pt-BR"><title>Mapa de teste</title></html>' }));
    await configured.goto(base);
    await configured.locator('.header-book').click();
    const url = new URL(await configured.evaluate(() => window.testOpenedURL));
    assert.equal(url.hostname, 'wa.me');
    assert.equal(url.searchParams.get('text'), 'Olá! Gostaria de saber mais sobre os atendimentos e agendar uma avaliação.');
    assert.equal(await configured.locator('#appointment-dialog').isVisible(), false);
    assert.equal(await configured.locator('#localizacao iframe').getAttribute('src'), 'https://www.google.com/maps/embed?pb=teste');
    assert.equal(await configured.locator('a[href^="tel:"]').getAttribute('href'), 'tel:+5511999999999');
    assert.equal(await configured.locator('a[href*="instagram.com"]').count(), 1);
    await configured.close();
  });
  await check('FAQ, contatos sem dados reais e ausência de destinos vazios', async () => {
    await page.locator('.faq summary').first().click();
    assert.equal(await page.locator('.faq details').first().getAttribute('open'), '');
    assert.equal(await page.locator('iframe').count(), 0);
    assert.ok((await page.locator('#localizacao').innerText()).includes('Endereço a confirmar'));
    assert.deepEqual(await page.locator('a[href]').evaluateAll(links => links.filter(a => ['', '#'].includes(a.getAttribute('href'))).map(a => a.outerHTML)), []);
    assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(links => links.filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash)), []);
  });
  await check('320, 390, 768, 1024 e 1440 sem overflow; imagens carregam', async () => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow em ${width}`);
    }
    await page.locator('img[src]').evaluateAll(async images => {
      for (const image of images) image.loading = 'eager';
      await Promise.all(images.map(image => image.decode().catch(() => {})));
    });
    assert.deepEqual(await page.locator('img[src]').evaluateAll(images => images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src)), []);
  });
  await check('menu mobile, Escape e navegação por âncora', async () => {
    await page.setViewportSize({ width: 390, height: 844 }); await page.evaluate(() => window.scrollTo(0, 0));
    const toggle = page.locator('.menu-toggle'); await toggle.click();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await toggle.click(); await page.locator('#main-nav a[href="#tratamentos"]').click();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(new URL(page.url()).hash, '#tratamentos');
    await toggle.click(); await page.locator('.nav-book').click();
    assert.equal(await page.locator('#appointment-dialog').isVisible(), true);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.activeElement === document.querySelector('.menu-toggle'));
    assert.equal(await toggle.evaluate(el => el === document.activeElement), true, 'Agendamento móvel deve devolver o foco ao menu');
  });
  await check('sem JavaScript preserva o conteúdo estático; file:// é funcional', async () => {
    const nojs = await browser.newPage({ javaScriptEnabled: false });
    await nojs.goto(base); assert.ok((await nojs.locator('h1').innerText()).includes('beleza')); await nojs.close();
    const local = await browser.newPage(); await local.goto(pathToFileURL(path.resolve('index.html')).href);
    assert.equal(await local.locator('.treatment-card').count(), 6); await local.locator('.header-book').click();
    assert.equal(await local.locator('#appointment-dialog').isVisible(), true); await local.close();
  });
  await check('contraste e semântica em desktop e mobile com axe', async () => {
    const { default: axe } = await import(pathToFileURL(path.join(process.env.TEMP, 'essentia-qa/node_modules/axe-core/axe.js')));
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 }); await page.evaluate(() => window.scrollTo(0, 0));
      await page.addScriptTag({ content: axe.source });
      const results = await page.evaluate(async () => await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] }));
      assert.deepEqual(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
    }
  });
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto(base);
  await page.locator('img[src]').evaluateAll(async images => {
    for (const image of images) image.loading = 'eager';
    await Promise.all(images.map(image => image.decode()));
  });
  await page.screenshot({ path: 'artifacts/lumiere-desktop.png' });
  await page.screenshot({ path: 'artifacts/lumiere-full.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 }); await page.screenshot({ path: 'artifacts/lumiere-mobile.png' });
  assert.deepEqual(errors, []);
  await writeFile('artifacts/lumiere-qa.json', JSON.stringify({ checks, errors }, null, 2));
} finally { await browser.close(); }
