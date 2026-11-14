---
titulo: "O que se faz no mundo"
ordem: 3
rota: "/mundo"
resumo: "Mapa interativo dos inquéritos sobre condições crónicas em cada país."
---

## Abertura

Muitos países, incluindo vizinhos e lusófonos, já medem as condições crónicas na população. Passe o rato sobre um país para ver os seus indicadores e clique para ver os inquéritos realizados.

## Mensagens-chave

- Mais de 50 inquéritos STEPS já foram harmonizados no consórcio HPACC, sobretudo de países de baixo e médio rendimento.
- Moçambique tem três inquéritos nacionais (2005, 2014/15 e InCRÓNICA 2024); Angola ainda não tem nenhum.
- Cada inquérito gera uma base de dados que alimenta dezenas de estudos de universidades e investigadores. O resultado não é um relatório único.

## Elementos visuais

- O mapa e as subpáginas de país estão especificados no `CLAUDE.md`. Fontes:
  - `dados/inqueritos.csv` — inquéritos por país.
  - `dados/artigos.csv` — artigos por país.
  - `dados/indicadores_paises.json` — indicadores do World Bank, gerado pelo script de build.
- **Subpáginas prioritárias:** Angola, Moçambique, Brasil, África do Sul, Índia. As restantes são geradas a partir do CSV quando houver linhas.

## Leituras externas

- [World Bank — World Development Indicators](https://databank.worldbank.org/source/world-development-indicators)
- [OMS — dados e relatórios STEPS por país](https://www.who.int/teams/noncommunicable-diseases/surveillance/data)
- [OMS — repositório de microdados de DNT](https://extranet.who.int/ncdsmicrodata/index.php/catalog)
- [DHS Program — pesquisa de inquéritos por biomarcador](https://www.dhsprogram.com/Methodology/Survey-Search.cfm)
- [HPACC — comentário sobre o uso dos dados STEPS (Lancet Glob Health)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10072128)
