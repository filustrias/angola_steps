import { getCollection, type CollectionEntry } from 'astro:content';

// Rótulos curtos para o menu superior (os títulos completos ficam no corpo da página).
const ROTULOS: Record<string, string> = {
  '/': 'Início',
  '/contexto': 'Contexto',
  '/angola-hoje': 'Angola hoje',
  '/mundo': 'O mundo',
  '/steps': 'STEPS',
  '/metodologias': 'Metodologias',
  '/o-que-falta-explorar': 'O que falta explorar',
  '/passos': 'Passos',
  '/capacidade-e-legado': 'Capacidade e legado',
  '/custos': 'Custos',
};

export type Pagina = CollectionEntry<'paginas'>;

export async function paginasOrdenadas(): Promise<Pagina[]> {
  const todas = await getCollection('paginas');
  return todas.sort((a, b) => a.data.ordem - b.data.ordem);
}

export const rotulo = (p: Pagina) => ROTULOS[p.data.rota] ?? p.data.titulo;

/** Caminho interno com o prefixo do site (base) e barra final. */
export function caminho(rota: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpa = rota.replace(/^\/|\/$/g, '');
  return limpa ? `${base}/${limpa}/` : `${base}/`;
}
