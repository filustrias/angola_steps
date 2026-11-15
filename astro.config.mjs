// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';
import remarkSeccoes from './src/plugins/remark-seccoes.mjs';
import rehypeTabelas from './src/plugins/rehype-tabelas.mjs';

// GitHub Pages: https://filustrias.github.io/angola_steps/
export default defineConfig({
  site: 'https://filustrias.github.io',
  base: '/angola_steps',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkSeccoes],
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }],
        rehypeTabelas,
      ],
    }),
  },
});
