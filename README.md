# clinica-estetica

**LUMIÈRE ESTÉTICA** — demonstração premium para clínicas de estética, em HTML5, CSS3 e JavaScript Vanilla. Sem frameworks, backend ou dependências de runtime.

Versão independente criada a partir da cópia fornecida em `template clinica estetica`. O template original da pasta irmã `template clinica` foi preservado. A adaptação reaproveita componentes, helpers, ícones, estrutura editorial, FAQ, servidor e padrões acessíveis do template.

## Abrir

Abra `index.html` diretamente no navegador. Os scripts clássicos funcionam também em `file://`. Para servir por HTTP, com Node instalado:

```powershell
npm start
```

Endereço padrão: `http://127.0.0.1:4173`. Não é necessário instalar pacotes.

Se o PowerShell bloquear `npm.ps1`, use `npm.cmd` no lugar de `npm`, por exemplo `npm.cmd start`. Não é necessário alterar a política de execução do Windows.

## Personalizar

Edite **`data.js`**. Ele centraliza marca, logo, paleta, imagens, tratamentos, profissionais, FAQ, depoimentos e contato.

```js
contact: {
  phone: '',            // Use seu número real com país e DDD
  whatsapp: '',         // País + DDD + número, apenas dígitos
  instagram: '',        // URL completa do perfil real
  address: '',          // Endereço real confirmado
  hours: '',            // Horários reais de atendimento
  mapUrl: '',           // URL para abrir orientações no Google Maps
  mapEmbedUrl: '',      // URL https://www.google.com/maps/embed?... do embed
  message: 'Olá! Gostaria de saber mais sobre os atendimentos e agendar uma avaliação.'
}
```

Sem um WhatsApp brasileiro válido, os botões abrem o modal demonstrativo. Nenhuma solicitação é enviada. Sem endereço real, o mapa é substituído por um estado de apresentação; horários e contato ficam a confirmar. A galeria permite ampliar, navegar por setas e fechar com Escape. Os tratamentos possuem filtros Todos, Faciais, Corporais e Bem-estar.

`logo: ''` usa a marca tipográfica; para um logo próprio, informe o caminho de uma imagem local. As imagens ficam em `assets/images/`, com créditos em `LICENSES.md`.

O conteúdo de `data.js` atualiza a página no navegador sem build. Para atualizar também a versão pré-renderizada, o conteúdo sem JavaScript, o sitemap e as metatags de compartilhamento:

```powershell
npm run render
```

Ao mudar a paleta, sincronize os fallbacks CSS e `DESIGN.md`. Verifique contraste da nova combinação.

## Estrutura

```text
index.html                  Página completa pré-renderizada
data.js                     Personalização central
assets/css/styles.css       Identidade visual e responsividade
assets/js/utils.js          Helpers reaproveitados
assets/js/icons.js          Ícones locais Lucide/Feather
assets/js/components.js     Cabeçalho, cards, FAQ, footer e dialogs
assets/js/pages/home.js     Composição da landing page
assets/js/app.js            Filtros, galeria, menu e contato
scripts/                    Servidor, render e verificações opcionais
tests/                      Testes das regras de dados e canais
```

## GitHub Pages

O projeto está pronto para hospedagem estática em uma subpasta do GitHub Pages, com caminhos relativos e `.nojekyll`. No repositório, abra **Settings → Pages**, selecione **Deploy from a branch**, branch **main** e pasta **/ (root)**. A URL esperada é `https://brick-teck.github.io/clinica-estetica/` após habilitar Pages.

Se usar outro domínio, atualize `siteUrl` em `data.js` e execute `npm run render`. Não há build obrigatório nem necessidade de backend.

## Verificação

```powershell
npm test
npm run check
```

O QA opcional com Playwright e axe usa instalações externas, sem adicioná-las ao site:

```powershell
$env:PORT='4175'
npm start
# Em outro terminal:
npm run qa
```

Configure `PLAYWRIGHT_MODULE` com o caminho do `playwright-core/index.mjs`, `BROWSER_PATH` com o executável Chromium/Edge e `QA_URL` caso use outra porta. O padrão desta máquina é `%TEMP%/essentia-qa`. A rotina axe usa `axe-core` no mesmo diretório. Capturas e relatório são gerados em `artifacts/`, ignorado pelo Git. Veja `docs/VERIFICACAO.md` para o resultado desta entrega.

## Conteúdo demonstrativo

Marca, serviços, funções e nomes são fictícios. Fotografias de perfis não representam os nomes apresentados e não implicam vínculo ou endosso. Depoimentos são explicitamente exemplos de layout, sem avaliações ou resultados reais. Não há credenciais profissionais inventadas, endereço simulado, formulário, analytics ou envio de dados. Google Fonts e canais externos, quando configurados, são serviços de terceiros.
