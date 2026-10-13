/* Personalização central. Use dados reais apenas depois de confirmá-los. */
window.clinicData = {
  name: 'LUMIÈRE ESTÉTICA', shortName: 'LUMIÈRE', tagline: 'ESTÉTICA & BEM-ESTAR',
  logo: '', siteUrl: 'https://brick-teck.github.io/clinica-estetica/',
  colors: { canvas: '#FAF7F2', soft: '#EDE5DA', rose: '#CBA7A0', ink: '#473B36', gold: '#B79B72', white: '#FFFFFF', muted: '#6D5E57' },
  images: { hero: 'assets/images/facial.webp', about: 'assets/images/clinica-premium.webp' },
  hero: {
    eyebrow: 'BELEZA, CUIDADO E BEM-ESTAR', titleBefore: 'Sua', titleAccent: 'beleza', titleAfter: 'merece um cuidado especial.',
    description: 'Um espaço dedicado ao autocuidado, à confiança e à valorização da sua beleza natural.'
  },
  about: {
    title: 'Um espaço pensado para você.',
    description: 'Acreditamos que cuidar de si começa com se sentir à vontade. Na LUMIÈRE, a proposta é receber cada pessoa com atenção, escutar suas expectativas e respeitar o seu tempo.',
    closing: 'Da luz que entra à conversa que acolhe, cada detalhe convida você a desacelerar. Um cuidado leve, próximo e feito para o seu momento.',
    values: ['Escuta e atenção em cada encontro', 'Conforto para viver o seu momento', 'Clareza para escolher o seu cuidado']
  },
  contact: {
    phone: '', whatsapp: '', instagram: '', address: '', hours: '', mapUrl: '', mapEmbedUrl: '',
    message: 'Olá! Gostaria de saber mais sobre os atendimentos e agendar uma avaliação.'
  },
  categories: [{ slug: '', name: 'Todos' }, { slug: 'faciais', name: 'Faciais' }, { slug: 'corporais', name: 'Corporais' }, { slug: 'bem-estar', name: 'Bem-estar' }],
  treatments: [
    { id: 'limpeza-de-pele', name: 'Limpeza de pele', category: 'faciais', image: 'assets/images/facial.webp', alt: 'Fotografia ilustrativa de um cuidado facial em spa', description: 'Um novo começo para a sua rotina de cuidado.', detail: 'Uma proposta de atenção à limpeza da pele. As etapas e a adequação do atendimento devem ser definidas por um profissional em uma avaliação individual.' },
    { id: 'hidratacao-facial', name: 'Hidratação facial', category: 'faciais', image: 'assets/images/skincare.webp', alt: 'Ritual ilustrativo de skincare com máscara facial', description: 'Uma pausa delicada para cuidar da sua pele.', detail: 'Um exemplo de cuidado para uma rotina de hidratação facial. Produtos, etapas e orientações dependem da avaliação profissional, sem promessa de resultados.' },
    { id: 'drenagem-linfatica', name: 'Drenagem linfática', category: 'corporais', image: 'assets/images/corporal.webp', alt: 'Fotografia ilustrativa de cuidado corporal em spa', description: 'Atenção ao corpo, respeito ao seu ritmo.', detail: 'Exemplo demonstrativo de cuidado corporal. A indicação, as técnicas e a possibilidade de atendimento precisam ser avaliadas por um profissional habilitado.' },
    { id: 'massagem-relaxante', name: 'Massagem relaxante', category: 'bem-estar', image: 'assets/images/massagem.webp', alt: 'Fotografia ilustrativa de uma sessão de massagem relaxante', description: 'Desacelerar também faz parte de se cuidar.', detail: 'Um momento de pausa em uma proposta de massagem. Preferências, conforto e adequação do atendimento são conversados antes da sessão.' },
    { id: 'tratamentos-corporais', name: 'Tratamentos corporais', category: 'corporais', image: 'assets/images/bem-estar.webp', alt: 'Frascos ilustrativos de produtos para autocuidado', description: 'Cuidado individualizado, da cabeça aos pés.', detail: 'Uma categoria ilustrativa para apresentar possibilidades de cuidado com o corpo. Os serviços realmente disponíveis devem ser confirmados diretamente com a clínica.' },
    { id: 'cuidados-faciais', name: 'Cuidados estéticos faciais', category: 'faciais', image: 'assets/images/ritual.webp', alt: 'Fotografia ilustrativa de massagem facial', description: 'Valorize o que faz a sua beleza ser única.', detail: 'Uma seleção demonstrativa de cuidados faciais. Uma conversa com um profissional ajuda a entender expectativas e possibilidades, sem recomendações individualizadas neste site.' }
  ],
  differences: [
    { icon: 'heart', name: 'Atendimento personalizado', description: 'Uma boa conversa para entender o que faz sentido para você.' },
    { icon: 'leaf', name: 'Ambiente acolhedor', description: 'Luz, conforto e detalhes que convidam a uma pausa.' },
    { icon: 'flower', name: 'Cuidado individualizado', description: 'Atenção às suas preferências, às suas necessidades e ao seu tempo.' },
    { icon: 'sun', name: 'Experiência de bem-estar', description: 'Um encontro com o autocuidado, do começo ao fim.' }
  ],
  professionals: [
    { id: 'helena', name: 'Helena Duarte', role: 'Cuidados faciais', image: 'assets/images/equipe-1.webp', description: 'Um olhar atento para acolher suas expectativas e conversar sobre o seu cuidado.' },
    { id: 'marina', name: 'Marina Avelar', role: 'Cuidados corporais', image: 'assets/images/equipe-2.webp', description: 'Escuta e delicadeza em uma proposta de atenção individualizada ao corpo.' },
    { id: 'clara', name: 'Clara Martins', role: 'Bem-estar e acolhimento', image: 'assets/images/equipe-3.webp', description: 'Presença e atenção aos detalhes para tornar cada encontro mais confortável.' }
  ],
  gallery: [
    { image: 'assets/images/clinica-premium.webp', name: 'Um convite à calma', description: 'Ambiente de atendimento ilustrativo' },
    { image: 'assets/images/ambiente.webp', name: 'Luz e acolhimento', description: 'Área de convivência ilustrativa' },
    { image: 'assets/images/clinica.webp', name: 'Cuidado nos detalhes', description: 'Referência de estrutura e recepção' },
    { image: 'assets/images/bem-estar.webp', name: 'Pequenos rituais', description: 'Elementos de autocuidado ilustrativos' }
  ],
  testimonials: [
    { quote: 'O cuidado começa na forma de receber. Um espaço que transmite calma em cada detalhe.', name: 'Depoimento ilustrativo', label: 'Exemplo de acolhimento' },
    { quote: 'Ter um momento para mim, com atenção e tranquilidade, faz toda a diferença na experiência.', name: 'Depoimento ilustrativo', label: 'Exemplo de bem-estar' },
    { quote: 'Uma conversa atenta e um ambiente confortável tornam o autocuidado ainda mais especial.', name: 'Depoimento ilustrativo', label: 'Exemplo de atendimento' }
  ],
  faq: [
    { question: 'Como agendar uma avaliação?', answer: 'Use o botão Agendar avaliação. Quando o WhatsApp estiver configurado, ele abrirá uma conversa com uma mensagem pronta. Nesta demonstração, você verá um aviso explicativo.' },
    { question: 'Quais tratamentos estão disponíveis?', answer: 'Este modelo apresenta exemplos de cuidados faciais, corporais e de bem-estar. A oferta real de serviços deve ser confirmada com a clínica antes de agendar.' },
    { question: 'Como escolher o tratamento ideal?', answer: 'Uma avaliação profissional é o primeiro passo para conversar sobre expectativas e conhecer as opções adequadas ao seu caso. Este site não fornece recomendações médicas individualizadas.' },
    { question: 'Quais são os horários de atendimento?', answer: 'Os horários reais aparecem na seção Localização depois de configurados. Enquanto não forem preenchidos, confirme essa informação com o responsável pelo atendimento.' },
    { question: 'Como entrar em contato?', answer: 'WhatsApp, telefone e Instagram podem ser configurados para uso real. Nesta versão, os canais ainda não estão ativos e nenhum pedido é enviado.' }
  ]
};
