# Verificação — LUMIÈRE ESTÉTICA

Data: **13/10/2026**. Ambiente: Windows, Node 24, Chromium via Microsoft Edge, Playwright Core e axe em instalação externa ao projeto.

## Regras e integridade

`npm.cmd test`: cinco testes para configuração demonstrativa sem canais reais, filtros por categoria, composição segura do WhatsApp, URLs de Google Maps/escaping e personalização da marca.

`npm.cmd run check`: onze arquivos JavaScript com sintaxe válida, 25 referências locais verificadas, IDs únicos, categorias existentes, HTML estático consistente, sitemap e `.nojekyll` presentes.

Os testes de personalização e foco mobile reproduziram os problemas apontados pela revisão antes das correções. O relatório do template original foi substituído por este documento.

## Navegador

`node scripts/lumiere-browser-qa.mjs` verifica onze grupos de comportamento:

1. Hero e seis tratamentos, posicionados antes de Sobre.
2. Categorias: três faciais, dois corporais, um bem-estar e restauração por Todos.
3. Detalhes de tratamentos, diálogo demonstrativo e retorno de foco.
4. Lightbox com setas, Escape e restauração de foco.
5. Transição do detalhe para agendamento e foco contido no diálogo.
6. Canais configurados: WhatsApp com mensagem codificada, Instagram, telefone e embed de mapa. As chamadas externas foram interceptadas no teste, sem envio real.
7. FAQ nativo, estado de endereço a confirmar e links sem destinos vazios.
8. Larguras 320, 390, 768, 1024 e 1440 px sem overflow horizontal; todas as imagens decodificadas.
9. Menu mobile, Escape, âncoras e retorno ao botão de menu após agendamento.
10. Conteúdo legível sem JavaScript e filtros/agendamento funcionais ao abrir `index.html` por `file://`.
11. Axe em 390 e 1440 px, sem violações nos conjuntos WCAG 2 A/AA, WCAG 2.1 AA e best practice utilizados.

## Inspeção visual

Capturas desktop 1440 × 1000, mobile 390 × 844 e página completa foram inspecionadas. Imagens lazy foram carregadas antes da captura completa. O layout usa as três famílias do briefing, marfim/bege/marrom e retratos monocromáticos; os dados ilustrativos aparecem identificados junto às seções e no rodapé.

Os arquivos `artifacts/lumiere-desktop.png`, `artifacts/lumiere-mobile.png`, `artifacts/lumiere-full.png` e `artifacts/lumiere-qa.json` ficam locais e são ignorados no Git.

## Limites

Verificação automatizada de acessibilidade não equivale a certificação. Não foi feito teste em dispositivo físico ou teste de um atendimento real. Telefone, WhatsApp, Instagram, endereço e horários permanecem sem configuração na entrega. Fontes dependem do Google Fonts, com fallbacks locais. O repositório contém os arquivos prontos para GitHub Pages; ativar Pages é uma configuração de hospedagem separada.
