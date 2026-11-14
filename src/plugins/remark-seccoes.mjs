// Trata as secções dos ficheiros de conteudo/:
// - remove as secções que são instruções internas (não se mostram ao leitor);
// - remove o título "Abertura" e marca os seus parágrafos como texto de abertura;
// - converte `[a confirmar ...]` numa nota discreta.
import { visit } from 'unist-util-visit';

const SECCOES_OCULTAS = ['elementos visuais', 'conteúdo da página inicial'];

const texto = (no) =>
  no.value ?? (no.children ? no.children.map(texto).join('') : '');

export default function remarkSeccoes() {
  return (arvore) => {
    const resultado = [];
    let modo = 'normal'; // 'normal' | 'oculta' | 'abertura'

    for (const no of arvore.children) {
      if (no.type === 'heading' && no.depth <= 2) {
        const nome = texto(no).trim().toLowerCase();
        if (SECCOES_OCULTAS.includes(nome)) {
          modo = 'oculta';
          continue;
        }
        if (nome === 'abertura') {
          modo = 'abertura';
          continue;
        }
        modo = 'normal';
      }
      if (modo === 'oculta') continue;
      if (modo === 'abertura' && no.type === 'paragraph') {
        no.data = { ...no.data, hProperties: { className: ['abertura'] } };
      }
      resultado.push(no);
    }
    arvore.children = resultado;

    visit(arvore, 'inlineCode', (no) => {
      if (/^\[a confirmar/i.test(no.value)) {
        no.data = {
          ...no.data,
          hName: 'span',
          hProperties: { className: ['a-confirmar'] },
        };
      }
    });
  };
}
