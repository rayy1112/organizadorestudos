// ===========================================
// Organizador de Estudos - script.js
// Adicionar, editar, concluir e remover tarefas,
// com manipulação dinâmica do DOM. Sem persistência
// de dados (limitação assumida no relatório).
// ===========================================

let contadorTarefas = 0;

const ICONE_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const ICONE_LIXEIRA = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>`;
const ICONE_LAPIS = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`;
const ICONE_X = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

function adicionarTarefa() {
    const inputTarefa = document.getElementById('tarefa');
    const inputData = document.getElementById('dataTarefa');
    const lista = document.getElementById('lista');

    const textoTarefa = inputTarefa.value.trim();
    const dataTarefa = inputData.value;

    if (textoTarefa === '') {
        inputTarefa.focus();
        inputTarefa.style.borderColor = 'var(--remover)';
        setTimeout(() => { inputTarefa.style.borderColor = ''; }, 800);
        return;
    }

    contadorTarefas++;
    const numero = String(contadorTarefas).padStart(2, '0');

    const item = criarItemTarefa(numero, textoTarefa, dataTarefa);
    lista.appendChild(item);
    ordenarTarefas();

    inputTarefa.value = '';
    inputData.value = '';
    inputTarefa.focus();

    atualizarEstadoVazio();
}

// Cria o <li> completo de uma tarefa, com modo de visualização e modo de edição
function criarItemTarefa(numero, textoTarefa, dataTarefa) {
    const item = document.createElement('li');
    item.className = 'tarefa-item';
    item.dataset.criadoEm = String(parseInt(numero, 10));
    item.dataset.dataIso = dataTarefa || '';

    const numeroSpan = document.createElement('span');
    numeroSpan.className = 'tarefa-numero';
    numeroSpan.textContent = 'Nº ' + numero;

    // ---------- Corpo: visualização ----------
    const corpo = document.createElement('div');
    corpo.className = 'tarefa-corpo';

    const visualizacao = document.createElement('div');
    visualizacao.className = 'modo-visualizacao';

    const textoP = document.createElement('p');
    textoP.className = 'tarefa-texto';
    textoP.textContent = textoTarefa;
    visualizacao.appendChild(textoP);

    const dataSpan = document.createElement('span');
    dataSpan.className = 'tarefa-data';
    if (dataTarefa) {
        dataSpan.textContent = '📅 ' + formatarData(dataTarefa);
    }
    visualizacao.appendChild(dataSpan);

    // ---------- Corpo: edição ----------
    const edicao = document.createElement('div');
    edicao.className = 'modo-edicao';

    const inputTexto = document.createElement('input');
    inputTexto.type = 'text';
    inputTexto.className = 'input-edicao-texto';
    inputTexto.setAttribute('aria-label', 'Editar tarefa');

    const inputData = document.createElement('input');
    inputData.type = 'date';
    inputData.className = 'input-edicao-data';
    inputData.setAttribute('aria-label', 'Editar prazo');

    edicao.appendChild(inputTexto);
    edicao.appendChild(inputData);

    corpo.appendChild(visualizacao);
    corpo.appendChild(edicao);

    // ---------- Ações: padrão (editar / concluir / remover) ----------
    const acoesPadrao = document.createElement('div');
    acoesPadrao.className = 'acoes-padrao';

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className = 'botao-icone acao-editar';
    btnEditar.title = 'Editar tarefa';
    btnEditar.innerHTML = ICONE_LAPIS;
    btnEditar.addEventListener('click', function () {
        entrarModoEdicao(item, textoP, dataSpan, inputTexto, inputData);
    });

    const btnConcluir = document.createElement('button');
    btnConcluir.type = 'button';
    btnConcluir.className = 'botao-icone acao-concluir';
    btnConcluir.title = 'Marcar como concluída';
    btnConcluir.innerHTML = ICONE_CHECK;
    btnConcluir.addEventListener('click', function () {
        item.classList.toggle('concluida');
        ordenarTarefas();
    });

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'botao-icone acao-remover';
    btnRemover.title = 'Remover tarefa';
    btnRemover.innerHTML = ICONE_LIXEIRA;
    btnRemover.addEventListener('click', function () {
        item.remove();
        atualizarEstadoVazio();
    });

    acoesPadrao.appendChild(btnEditar);
    acoesPadrao.appendChild(btnConcluir);
    acoesPadrao.appendChild(btnRemover);

    // ---------- Ações: edição (salvar / cancelar) ----------
    const acoesEdicao = document.createElement('div');
    acoesEdicao.className = 'acoes-edicao';

    const btnSalvar = document.createElement('button');
    btnSalvar.type = 'button';
    btnSalvar.className = 'botao-icone acao-salvar';
    btnSalvar.title = 'Salvar alterações';
    btnSalvar.innerHTML = ICONE_CHECK;
    btnSalvar.addEventListener('click', function () {
        salvarEdicao(item, textoP, dataSpan, inputTexto, inputData);
    });

    const btnCancelar = document.createElement('button');
    btnCancelar.type = 'button';
    btnCancelar.className = 'botao-icone acao-cancelar';
    btnCancelar.title = 'Cancelar edição';
    btnCancelar.innerHTML = ICONE_X;
    btnCancelar.addEventListener('click', function () {
        item.classList.remove('editando');
    });

    acoesEdicao.appendChild(btnSalvar);
    acoesEdicao.appendChild(btnCancelar);

    // Enter salva, Esc cancela (dentro dos campos de edição)
    [inputTexto, inputData].forEach(function (campo) {
        campo.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                salvarEdicao(item, textoP, dataSpan, inputTexto, inputData);
            } else if (e.key === 'Escape') {
                item.classList.remove('editando');
            }
        });
    });

    const acoes = document.createElement('div');
    acoes.className = 'tarefa-acoes';
    acoes.appendChild(acoesPadrao);
    acoes.appendChild(acoesEdicao);

    item.appendChild(numeroSpan);
    item.appendChild(corpo);
    item.appendChild(acoes);

    return item;
}

// Preenche os campos de edição com os valores atuais e ativa o modo de edição
function entrarModoEdicao(item, textoP, dataSpan, inputTexto, inputData) {
    inputTexto.value = textoP.textContent;
    inputData.value = item.dataset.dataIso || '';
    item.classList.add('editando');
    inputTexto.focus();
    inputTexto.select();
}

// Valida e aplica as alterações feitas no modo de edição
function salvarEdicao(item, textoP, dataSpan, inputTexto, inputData) {
    const novoTexto = inputTexto.value.trim();

    if (novoTexto === '') {
        inputTexto.style.borderColor = 'var(--remover)';
        inputTexto.focus();
        setTimeout(() => { inputTexto.style.borderColor = ''; }, 800);
        return;
    }

    textoP.textContent = novoTexto;

    if (inputData.value) {
        dataSpan.textContent = '📅 ' + formatarData(inputData.value);
        item.dataset.dataIso = inputData.value;
    } else {
        dataSpan.textContent = '';
        delete item.dataset.dataIso;
    }

    item.classList.remove('editando');
    ordenarTarefas();
}

// Converte data do formato AAAA-MM-DD para DD/MM/AAAA
function formatarData(data) {
    const partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

// Reordena os cards na tela conforme o critério escolhido na barra de ordenação
function ordenarTarefas() {
    const lista = document.getElementById('lista');
    const seletor = document.getElementById('ordenarPor');
    if (!lista || !seletor) return;

    const criterio = seletor.value;
    const itens = Array.from(lista.children);

    itens.sort(function (a, b) {
        switch (criterio) {
            case 'prazo-asc':
                return compararPorData(a, b, true);
            case 'prazo-desc':
                return compararPorData(a, b, false);
            case 'pendentes':
                return Number(a.classList.contains('concluida')) - Number(b.classList.contains('concluida'));
            case 'concluidas':
                return Number(b.classList.contains('concluida')) - Number(a.classList.contains('concluida'));
            case 'az':
                return obterTextoTarefa(a).localeCompare(obterTextoTarefa(b), 'pt-BR', { sensitivity: 'base' });
            case 'criacao':
            default:
                return Number(a.dataset.criadoEm) - Number(b.dataset.criadoEm);
        }
    });

    itens.forEach(function (item) {
        lista.appendChild(item);
    });
}

function obterTextoTarefa(item) {
    const paragrafo = item.querySelector('.tarefa-texto');
    return paragrafo ? paragrafo.textContent : '';
}

// Compara duas tarefas pela data (AAAA-MM-DD). Tarefas sem prazo ficam sempre por último.
function compararPorData(a, b, ascendente) {
    const dataA = a.dataset.dataIso || '';
    const dataB = b.dataset.dataIso || '';

    if (!dataA && !dataB) return 0;
    if (!dataA) return 1;
    if (!dataB) return -1;

    return ascendente ? dataA.localeCompare(dataB) : dataB.localeCompare(dataA);
}

// Mostra/esconde mensagem de "nenhuma tarefa" dinamicamente
function atualizarEstadoVazio() {
    const lista = document.getElementById('lista');
    const vazio = document.getElementById('listaVazia');
    if (!vazio) return;
    vazio.style.display = lista.children.length === 0 ? 'block' : 'none';
}

// Permite adicionar a tarefa pressionando Enter no campo de texto
document.getElementById('tarefa').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

document.addEventListener('DOMContentLoaded', atualizarEstadoVazio);
