// ============================================================
//  My Media Log - Etapa 1: Listar filmes (ler dados)
// ============================================================

// Endereço base do json-server.
// Quando você roda "npx json-server db.json", ele cria uma API
// em http://localhost:3000 com uma "rota" para cada chave do db.json.
// Como temos a chave "filmes", a rota vira http://localhost:3000/filmes
const API_URL = "http://localhost:3000";

// Pegamos a referência do <div> onde os filmes vão aparecer.
const listaFilmes = document.getElementById("lista-filmes");


// ------------------------------------------------------------
//  Função: buscar os filmes na API
// ------------------------------------------------------------
// "async" significa que a função faz algo que leva tempo
// (buscar dados pela internet/rede) e esperamos com "await".
async function buscarFilmes() {
  try {
    // fetch() faz uma requisição HTTP. Aqui pedimos a lista de filmes.
    const resposta = await fetch(`${API_URL}/filmes`);

    // Se a resposta não for "ok" (ex: erro 404), avisamos.
    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os filmes.");
    }

    // Convertemos a resposta (que vem em texto JSON) para um array de objetos.
    const filmes = await resposta.json();

    // Mandamos a lista para a função que desenha na tela.
    mostrarFilmes(filmes);
  } catch (erro) {
    // Se qualquer coisa der errado (ex: servidor desligado), mostramos um aviso.
    listaFilmes.innerHTML = `
      <p class="erro">
        ⚠️ ${erro.message}<br>
        Verifique se o json-server está rodando (npx json-server db.json).
      </p>`;
  }
}


// ------------------------------------------------------------
//  Função: desenhar os filmes na tela
// ------------------------------------------------------------
function mostrarFilmes(filmes) {
  // Se a lista estiver vazia, avisamos.
  if (filmes.length === 0) {
    listaFilmes.innerHTML = `<p class="carregando">Nenhum filme cadastrado ainda.</p>`;
    return;
  }

  // Limpamos o "Carregando..." antes de inserir os cards.
  listaFilmes.innerHTML = "";

  // Para cada filme, criamos um "card" e adicionamos na tela.
  filmes.forEach((filme) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      ${filme.favorito ? `<div class="favorito-tag">❤️</div>` : ""}
      <img src="${filme.foto}" alt="Pôster de ${filme.nome}">
      <div class="card-corpo">
        <div class="estrelas">${gerarEstrelas(filme.nota)}</div>
        <h3>${filme.nome}</h3>
        <p class="card-meta">${filme.ano} • ${filme.duracao} • ${filme.genero}</p>
        <p class="card-descricao">${filme.descricao}</p>
      </div>
    `;

    listaFilmes.appendChild(card);
  });
}


// ------------------------------------------------------------
//  Função auxiliar: transformar uma nota (0 a 5) em estrelas
// ------------------------------------------------------------
// Ex: nota 4 -> "★★★★☆"
function gerarEstrelas(nota) {
  const cheias = "★".repeat(nota);
  const vazias = "☆".repeat(5 - nota);
  return cheias + vazias;
}


// ------------------------------------------------------------
//  Ponto de partida: assim que a página carrega, buscamos os filmes.
// ------------------------------------------------------------
buscarFilmes();
