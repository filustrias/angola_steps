# CLAUDE.md — Website "Condições crónicas em Angola"

## O que é este projeto

Website estático para apresentar a colegas (MINSA, OMS, INE, parceiros e academia) o estado atual do conhecimento sobre condições crónicas, fatores de risco e uso de serviços de saúde em Angola, e o caminho para um inquérito nacional do tipo STEPS.

O conteúdo de cada página está em `conteudo/`. Os dados do mapa estão em `dados/`. **Não inventes conteúdo, números nem referências.** Usa apenas o que está nestes ficheiros. Onde faltar informação, deixa um marcador visível `[a confirmar]` e regista-o em `PENDENCIAS.md`.

## Documentos-fonte nesta pasta

- `IIMS 2023–2024.pdf` — relatório final do IIMS 2023–24 (INE/MINSA).
- `RELAToRIO-NACIONAL-InCRoNICA.pdf` — relatório nacional do InCRÓNICA 2024 (Moçambique).

São fontes de consulta. Não os movas, não os apagues e não os publiques no site; o site aponta para os links públicos.

## Público e tom

- Leitores técnicos e de gestão, em Angola e noutros países lusófonos.
- Tom leve, limpo e sóbrio. Sem frases de impacto, sem adjetivos promocionais, sem emoji.
- Cada página abre com 2 a 3 frases curtas e oferece aprofundamento por links externos.
- Língua: português, registo usado em Angola e Moçambique (equipa, cuidados de saúde primários, unidade sanitária, rato, recolha).

## Stack

- **Astro** (site estático), com páginas geradas a partir de ficheiros Markdown (content collections).
- **Mapa:** D3 (`d3-geo`) + TopoJSON do mundo (`world-atlas`), num componente cliente. Sem React, salvo necessidade.
- **Dados do World Bank:** um script em `scripts/` descarrega os indicadores na fase de build e grava `dados/indicadores_paises.json`. O site não chama APIs externas no navegador.
- **Deploy:** GitHub Pages (workflow em `.github/workflows/`).
- CSS simples, próprio, sem framework pesado. Tipografia legível, bom contraste, responsivo e acessível (navegação por teclado no mapa, texto alternativo nas figuras).

## Estrutura de páginas

| Ordem | Ficheiro | Rota |
| --- | --- | --- |
| 0 | `conteudo/00-inicio.md` | `/` |
| 1 | `conteudo/01-contexto.md` | `/contexto` |
| 2 | `conteudo/02-angola-hoje.md` | `/angola-hoje` |
| 3 | `conteudo/03-mapa-mundo.md` | `/mundo` + `/mundo/[pais]` |
| 4 | `conteudo/04-steps.md` | `/steps` |
| 5 | `conteudo/05-metodologias.md` | `/metodologias` |
| 6 | `conteudo/06-o-que-falta-explorar.md` | `/o-que-falta-explorar` |
| 7 | `conteudo/07-passos.md` | `/passos` |
| 8 | `conteudo/08-capacidade-legado.md` | `/capacidade-e-legado` |
| 9 | `conteudo/09-custos.md` | `/custos` |

Navegação: menu superior com as 9 páginas por ordem e botões "anterior / seguinte" no fim de cada página.

## Formato de cada ficheiro de conteúdo

Cada ficheiro tem frontmatter (`titulo`, `ordem`, `rota`, `resumo`) e estas secções:
- **Abertura:** 2 a 3 frases.
- **Mensagens-chave**
- **Elementos visuais:** instruções para ti. Não as mostres ao leitor; constrói-as.
- **Leituras externas:** links que abrem num novo separador (`target="_blank" rel="noopener"`).

## Mapa-múndi (página 3)

- **Ao passar o rato (tooltip):** nome do país, população, PIB per capita (US$ correntes), esperança de vida ao nascer, médicos por 1.000 habitantes e % da população com 65+ anos. Mostra também o ano de cada valor.
- **Indicadores WDI** (confirma os códigos na API antes de usar):
  - `SP.POP.TOTL` — população.
  - `NY.GDP.PCAP.CD` — PIB per capita.
  - `SP.DYN.LE00.IN` — esperança de vida.
  - `SH.MED.PHYS.ZS` — médicos por 1.000.
  - `SP.POP.65UP.TO.ZS` — % com 65+ anos.
  - Usa o valor mais recente disponível de cada indicador e indica o ano.
- **Cor do país:** tipo de inquérito mais recente, a partir de `dados/inqueritos.csv`:
  - `STEPS`
  - `inquerito_exame` (inquérito nacional com exame)
  - `DHS_biomarcadores`
  - `so_entrevista`
  - `coorte`
  - `nenhum_identificado`
  - Para os países sem linha no CSV, usa uma cor neutra com a legenda "sem informação neste site".
- **Ao clicar:** abre `/mundo/[iso3]`. A subpágina mostra:
  1. a ficha do país (mesmos indicadores do tooltip);
  2. uma tabela de inquéritos com ano, nome, faixa etária, amostra, se mede fatores de risco, se mede prevalência com exame, se mede uso de serviços e link para o relatório;
  3. uma lista de 5 a 10 artigos produzidos com os dados desses estudos, com nome e link (ver `dados/artigos.csv`). O objetivo é mostrar o papel das universidades e dos investigadores: um inquérito deixa uma base de dados que alimenta muitos estudos, não um relatório único.
- Angola destacada no mapa, com link para `/angola-hoje`.

## Regras

- Qualquer número no site precisa de fonte com link. Se a fonte não estiver nos ficheiros, não publiques o número.
- Os campos marcados `a_confirmar` no CSV aparecem com uma nota discreta "[a confirmar]".
- Não copies blocos longos de texto das fontes. Parafraseia.
- Antes de cada commit, corre `npm run build` e verifica que não há links internos partidos.
