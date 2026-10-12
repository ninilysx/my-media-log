# 📋 Plano do Projeto — My Media Log

> Este documento guarda o contexto do projeto para facilitar a continuidade
> em outras sessões ou editores. Responda sempre em **português do Brasil**.

## 🎯 Sobre o projeto

**My Media Log** é um site front-end: um diário pessoal de mídias onde é
possível cadastrar, editar, atualizar e excluir itens como filmes, séries,
animes, mangás, livros, artistas, álbuns e músicas.

**Objetivo pessoal:** aprender a programar com ajuda de IA, indo por etapas,
com explicações claras sobre o que cada parte do código faz.

### Funcionalidades desejadas
- Criar, editar, atualizar e remover itens (CRUD)
- Pesquisa e filtros
- Favoritar itens
- Dar notas com estrelas (0 a 5)
- Foto dos itens (via link/URL por enquanto)
- Nome, descrição e espaço para resenha

## 🛠️ Tecnologias

- **HTML, CSS e JavaScript** puro (front-end)
- **json-server** (versão 0.17) para permanência de dados via API REST em
  `http://localhost:3000`
- Os dados ficam no arquivo `db.json`

### Como rodar o projeto
1. `npm install`
2. `npx json-server db.json`
3. Abrir o `index.html` (de preferência com a extensão Live Server)

## 🗂️ Modelo de dados

### Campos comuns a todos os itens
`id`, `nome`, `foto` (URL), `descricao`, `nota` (0–5), `favorito` (true/false),
`resenha`, `status`

### Campos específicos por categoria

| Categoria   | Campos específicos                                   |
|-------------|------------------------------------------------------|
| 🎬 Filmes   | diretor, ano, duração, gênero, país                  |
| 📺 Séries   | criador, temporadas, episódios, gênero, ano          |
| 🎌 Animes   | estúdio, temporadas, episódios, gênero, ano          |
| 📖 Mangás   | autor, volumes/capítulos, status, gênero             |
| 📚 Livros   | autor, ano, gênero                                   |
| 🎤 Artistas | tipo (solo/banda), país, gênero musical              |
| 💿 Álbuns   | ligado a um Artista (`artistaId`), ano, nº de faixas |
| 🎵 Músicas  | ligada a um Artista (`artistaId`) e a um Álbum (`albumId`), duração |

### Relacionamentos
Músicas e álbuns se conectam a artistas por **ID** (sem repetir o nome).

```
Artista (id: 1) → "Beyoncé"
    └── Álbum (id: 10, artistaId: 1) → "Lemonade"
            └── Música (id: 100, artistaId: 1, albumId: 10) → "Formation"
```

## 🧱 Estrutura de arquivos

```
my-media-log/
├── db.json              # "banco de dados" (usado pelo json-server)
├── package.json         # gerencia o json-server
├── index.html           # a página
├── css/
│   └── style.css        # visual (tema escuro roxo)
├── js/
│   └── script.js        # lógica + chamadas à API (fetch)
├── PLANO.md             # este documento
└── README.md
```

## 🪜 Plano em etapas

Estratégia: fazer o fluxo CRUD completo com **Filmes** primeiro e depois
replicar para as outras categorias.

- **Etapa 1** — Estrutura base + `db.json` + listar filmes na tela (GET)
- **Etapa 2** — Criar/adicionar filmes (formulário + POST)
- **Etapa 3** — Editar e excluir (PUT/DELETE)
- **Etapa 4** — Favoritar + notas com estrelas
- **Etapa 5** — Busca e filtros
- **Etapa 6** — Relacionamentos (artista → álbum → música)

## 📍 Estado atual

A **Etapa 1** está concluída: estrutura base criada e listagem de filmes
funcionando (lê os filmes da API e exibe em cards com estrelas e indicação
de favoritos). O `db.json` contém 3 filmes de exemplo.
