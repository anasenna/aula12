
// Lista inicial de alunos
let turma = [
    { nome: "Ana Souza", media: 8.5 },
    { nome: "Carlos Lima", media: 5.0 },
    { nome: "Mariana Alves", media: 9.0 },
    { nome: "Pedro Santos", media: 4.5 }
];

// Capturando os elementos da página
const form = document.querySelector("#form-aluno");
const busca = document.querySelector("#busca");
const tabela = document.querySelector("#corpo-tabela");
const mensagem = document.querySelector("#mensagem");
const avisoBusca = document.querySelector("#aviso-busca");

// Função para mostrar os alunos na tabela
function mostrarTurma(lista) {

    tabela.innerHTML = "";

    lista.forEach((aluno) => {

        const linha = document.createElement("tr");

        const situacao = aluno.media >= 7
            ? "Aprovado"
            : "Reprovado";

        linha.classList.add(
            aluno.media >= 7 ? "aprovado" : "reprovado"
        );

        linha.innerHTML = `
            <td></td>
            <td>${aluno.media.toFixed(1)}</td>
            <td>${situacao}</td>
        `;

        // Insere o nome como texto, evitando interpretar HTML
        linha.cells[0].textContent = aluno.nome;

        // Evento de clique duplo para remover aluno
        linha.addEventListener("dblclick", () => {

            const posicao = turma.indexOf(aluno);

            if (posicao !== -1) {
                turma.splice(posicao, 1);

                const termo = busca.value.toLowerCase().trim();

                const filtrados = turma.filter((a) =>
                    a.nome.toLowerCase().includes(termo)
                );

                mostrarTurma(filtrados);

                mensagem.textContent =
                    "Aluno removido com sucesso!";

                mensagem.className = "sucesso";
            }

        });

        tabela.appendChild(linha);

    });

}

// Exibindo a turma inicial
mostrarTurma(turma);

// Evento de envio do formulário
form.addEventListener("submit", (event) => {

    event.preventDefault();

    const nome = form.nome.value.trim();
    const notaTexto = form.nota.value.trim();
    const nota = Number(notaTexto);

    // Limpando mensagens e erros anteriores
    mensagem.textContent = "";
    mensagem.className = "";

    form.nome.classList.remove("campo-erro");
    form.nota.classList.remove("campo-erro");

    // Validando o nome
    if (nome === "") {

        mensagem.textContent = "Digite o nome do aluno.";
        mensagem.className = "erro";

        form.nome.classList.add("campo-erro");
        form.nome.focus();

        return;
    }

    // Nome precisa ter pelo menos 3 caracteres
    if (nome.length < 3) {

        mensagem.textContent =
            "O nome precisa ter pelo menos 3 caracteres.";

        mensagem.className = "erro";
        form.nome.classList.add("campo-erro");
        form.nome.focus();

        return;
    }

    // Validando a nota
    if (
        notaTexto === "" ||
        !Number.isFinite(nota) ||
        nota < 0 ||
        nota > 10
    ) {

        mensagem.textContent =
            "Digite uma nota válida entre 0 e 10.";

        mensagem.className = "erro";
        form.nota.classList.add("campo-erro");
        form.nota.focus();

        return;
    }

    // Cadastrando o aluno no array
    turma.push({
        nome: nome,
        media: nota
    });

    // Atualizando a tabela com a busca atual
    const termo = busca.value.toLowerCase().trim();

    const filtrados = turma.filter((aluno) =>
        aluno.nome.toLowerCase().includes(termo)
    );

    mostrarTurma(filtrados);

    // Mensagem de sucesso
    mensagem.textContent = "Aluno cadastrado com sucesso!";
    mensagem.className = "sucesso";

    // Limpando o formulário
    form.reset();

    // Voltando o cursor para o nome
    form.nome.focus();

});

// Evento de busca em tempo real
busca.addEventListener("input", () => {

    const termo = busca.value.toLowerCase().trim();

    const filtrados = turma.filter((aluno) =>
        aluno.nome.toLowerCase().includes(termo)
    );

    mostrarTurma(filtrados);

    if (filtrados.length === 0) {
        avisoBusca.textContent =
            "Nenhum aluno encontrado.";
    } else {
        avisoBusca.textContent = "";
    }

});

// Desafio extra: tecla Esc limpa a busca
busca.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        busca.value = "";

        mostrarTurma(turma);

        avisoBusca.textContent = "";

        busca.focus();
    }

});
