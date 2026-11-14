// Envolve cada <table> num contentor com deslocamento horizontal em ecrãs estreitos.
export default function rehypeTabelas() {
  return (arvore) => {
    const percorrer = (no) => {
      if (!no.children) return;
      no.children = no.children.map((filho) => {
        if (filho.type === 'element' && filho.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['tabela'], tabIndex: 0, role: 'region', ariaLabel: 'Quadro' },
            children: [filho],
          };
        }
        percorrer(filho);
        return filho;
      });
    };
    percorrer(arvore);
  };
}
