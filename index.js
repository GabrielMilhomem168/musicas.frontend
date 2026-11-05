const urlBackend = "http://localhost:3000";

const listaMusicas = document.getElementById("listaMusicas");

async function buscarMusicas() {
    const resposta = await fetch(urlBackend);
    const musicas = await resposta.json();

    musicas.forEach((musica) => {
        listaMusicas.innerHTML += `
            <article class="musica">
                <h2>${musica.titulo}</h2>
                <p class="artista">${musica.artista}</p>
                <p class="detalhes">${musica.genero} | ${musica.ano} | ${musica.duracao} min</p>
                <div class="acoes">
                    <a class="editar" href="editar.html?id=${musica.id}">Editar</a>
                    <button class="apagar">Apagar</button>
                </div>
            </article>


            
        `;
    });
}
app.post("/cadastrar", (request, response) => {
    const { titulo, artista, genero, ano, duracao } = request.body;

    const comandoInsert = "INSERT INTO musicas_seunome(titulo, artista, genero, ano, duracao) VALUES (?, ?, ?, ?, ?)";

    sql.query(comandoInsert, [titulo, artista, genero, ano, duracao], (error) => {
        if (error) {
            console.log(error);
            return;
        }

        response.status(201).json({ mensagem: "Música cadastrada com sucesso!" });
    });
});

buscarMusicas();