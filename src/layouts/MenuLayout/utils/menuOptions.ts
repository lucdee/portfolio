import type { MenuNode } from './MenuNode';

export const blogNodes: MenuNode[] = [
  {
    title: 'Blog',
    items: [
      {
        label: 'Tech Insights',
        description: 'Dicas e melhores práticas para profissionais de TI.',
        path: '/blog/tech-insights',
      },
      {
        label: 'Tech Trends',
        description: 'Tendências de mercado para profissionais de TI.',
        path: '/blog/tech-trends',
      },
      {
        label: 'Business Insights',
        description:
          'Dicas e melhores práticas para profissionais de negócios.',
        path: '/blog/business-insights',
      },
      {
        label: 'Business Trends',
        description: 'Tendências de mercado para profissionais de negócios.',
        path: '/blog/business-trends',
      },
    ],
  },
];

export const produtosNodes: MenuNode[] = [
  {
    title: 'Serviços',
    items: [
      {
        label: 'Pesquisa',
        description:
          'Selecione fornecedores de SaaS e Cloud baseando-se em dados.',
        path: '/servicos/pesquisa',
      },
      {
        label: 'Consultoria',
        description: 'Tire do papel seus projetos de Transformação Digital.',
        path: '/servicos/consultoria',
      },
    ],
  },
];
