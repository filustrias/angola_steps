// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import remarkSeccoes from './src/plugins/remark-seccoes.mjs';
import rehypeTabelas from './src/plugins/rehype-tabelas.mjs';

// GitHub Pages: https://filustrias.github.io/angola_steps/
export default defineConfig({
  site: 'https://filustrias.github.io',
  base: '/angola_steps',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkSeccoes],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }],
      rehypeTabelas,
    ],
  },
});
