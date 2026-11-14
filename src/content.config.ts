import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const paginas = defineCollection({
  loader: glob({ pattern: '*.md', base: './conteudo' }),
  schema: z.object({
    titulo: z.string(),
    ordem: z.number().int(),
    rota: z.string(),
    resumo: z.string(),
  }),
});

export const collections = { paginas };
