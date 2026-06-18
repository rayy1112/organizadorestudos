function adicionarTarefa() {

    let campoTarefa = document.getElementById("tarefa");
    let campoData = document.getElementById("dataTarefa");

    let tarefa = campoTarefa.value.trim();
    let data = campoData.value;

    if (tarefa === "") {
        alert("Digite uma tarefa.");
        return;
    }

    let lista = document.getElementById("lista");

    let item = document.createElement("li");

    item.className =
        "list-group-item d-flex justify-content-between align-items-center";

    let conteudo = document.createElement("div");

    let texto = document.createElement("span");
    texto.textContent = tarefa;

    texto.style.cursor = "pointer";

    texto.onclick = function () {
        texto.classList.toggle("concluida");
    };

    let prazo = document.createElement("div");
    prazo.className = "data";
    prazo.textContent = "Prazo: " + data;

    conteudo.appendChild(texto);
    conteudo.appendChild(document.createElement("br"));
    conteudo.appendChild(prazo);

    let botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.className =
        "btn btn-danger btn-sm";

    botaoExcluir.onclick = function () {
        item.remove();
    };

    item.appendChild(conteudo);
    item.appendChild(botaoExcluir);

    lista.appendChild(item);

    campoTarefa.value = "";
    campoData.value = "";
}