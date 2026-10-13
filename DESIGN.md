---
version: 1.0
name: LUMIÈRE ESTÉTICA
register: marketing
locale: pt-BR
colors:
  canvas: "#FAF7F2"
  soft: "#EDE5DA"
  rose: "#CBA7A0"
  ink: "#473B36"
  gold: "#B79B72"
  white: "#FFFFFF"
  muted: "#6D5E57"
typography:
  display: "Playfair Display"
  body: "DM Sans"
  accent: "Cormorant Garamond"
---
# LUMIÈRE — direção de design

Landing page comercial de uma marca fictícia de estética e bem-estar. O briefing fornecido pelo usuário determina o conteúdo, as cores e as famílias tipográficas. O propósito é apresentar tratamentos e a proposta de atendimento, conduzindo a uma conversa de avaliação sem simular um serviço real.

A cópia fornecida em `template clinica estetica` é o projeto independente. A pasta irmã `template clinica` permanece como original. Reaproveitados: estrutura estática, divisão de componentes, hero em duas colunas, composição editorial de Sobre, grids de cards, helpers de links e escaping, ícones locais, FAQ nativo, padrão de diálogos, servidor e abordagem de QA. O catálogo de especialidades médicas dá lugar aos cuidados de estética.

## Identidade e composição

Marfim como base, bege para acolhimento, marrom para contraste e ações. Rosé e dourado aparecem em detalhes. Sem estatísticas, resultados, avaliações, credenciais ou premiações inventadas.

A assinatura é o enquadramento em arco da fotografia facial, com contorno fino e selo tipográfico de essência natural. A palavra beleza em Cormorant itálico dá leveza ao título em Playfair. Não usar números decorativos ou carrosséis automáticos. Fotografias grandes e retratos monocromáticos preservam a unidade visual.

Container de 1280 px, gutters de 56 px em desktop e 20 px no celular. Seções com 108 px de respiro em desktop e 64 px no celular. Cards sem sombra, bordas finas e botões retos. Hero dividido em desktop, empilhado abaixo de 640 px. Menu recolhido abaixo de 1280 px.

## Tokens e personalização

`data.js` é a fonte de marca, cores, imagens, conteúdo, categorias e canais. `app.js` aplica as cores como propriedades CSS. `assets/css/styles.css` tem os mesmos valores de fallback para a leitura sem JavaScript. Ao mudar valores duráveis, atualizar este documento e os fallbacks; `npm run render` sincroniza o HTML estático e SEO.

O texto secundário usa #6D5E57 para contraste tanto no marfim quanto no bege. Dourado e rosé não são usados para textos pequenos de leitura. Botão principal marrom/marfim, botão secundário com linha fina e setas locais.

## Comportamento

Filtros locais, com estado `aria-pressed` e contagem anunciada. Saiba mais abre detalhe, sem exigir contato. Agendar avaliação, Agendar pelo WhatsApp e contato da equipe usam o mesmo canal configurável. Sem número válido, abrem um diálogo demonstrativo. Endereço, telefone, horário e Instagram vazios são identificados; o mapa só carrega com endereço e URL de embed válidos. Não são usados endereços fictícios como reais.

`dialog` nativo contém foco, permite Escape, torna o fundo inerte e restaura o foco. A galeria aceita setas esquerda/direita e controles visíveis. FAQ usa details/summary. Navegação móvel é um disclosure não modal, fechado por Escape, links, clique externo e saída de foco.

## Acessibilidade e verificação

Semântica nativa, skip link, foco visível, alt descritivo, alvos acessíveis, scrollbars visíveis e geometria reservada nas imagens. Respeitar reduced motion e forced colors. Reveal é um aprimoramento e não oculta conteúdo com JavaScript desativado.

Validação por Node e navegador: categorias, destinos, fallback, teclado, foco, imagens, abertura direta, zoom e responsividade. Axe é uma verificação automatizada, não uma certificação de conformidade. Capturas ficam em artifacts, fora do versionamento.
