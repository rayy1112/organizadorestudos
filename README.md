# 📚 Organizador de Estudos

Aplicação web responsiva para auxiliar estudantes na organização de suas
atividades acadêmicas, com identidade visual própria inspirada em um
caderno de estudos: papel pontilhado, marca-texto e fichas numeradas
para cada tarefa.

## 🎯 Objetivo

Auxiliar estudantes — especialmente aqueles que conciliam estudo e
trabalho — a organizar tarefas, prazos e compromissos acadêmicos por
meio de uma interface acessível, responsiva e de fácil utilização,
sem necessidade de instalação (executada diretamente no navegador).

## 🛠️ Tecnologias utilizadas

- **HTML5** — estruturação do conteúdo e dos componentes da interface
- **CSS3** — estilização visual e responsividade, com uso de **Flexbox**
  e **Media Queries** para adaptação a diferentes tamanhos de tela
  (não utiliza frameworks de CSS; todo o estilo é autoral)
- **JavaScript** — interatividade e manipulação dinâmica do DOM
  (adicionar, editar, concluir, remover e ordenar tarefas)
- **Google Fonts** — tipografia (Space Grotesk, Inter e Space Mono)

## ⚙️ Funcionalidades

- Cadastro de tarefas com nome e prazo (data)
- Edição inline de tarefas já cadastradas (texto e prazo), com opção de
  salvar ou cancelar a alteração
- Marcação de tarefas como concluídas (com indicação visual)
- Remoção de tarefas da lista
- Ordenação dos cards por: adicionadas recentemente, prazo mais próximo,
  prazo mais distante, pendentes primeiro, concluídas primeiro ou ordem
  alfabética
- Mensagem de estado vazio quando não há tarefas cadastradas
- Layout adaptável para celular, tablet e computador

## 🎨 Identidade visual

- Tema "caderno de estudos": fundo com grade de pontos, efeito de
  marca-texto animado no título e fita decorativa no painel principal
- Paleta de cores com o rosa (`#F81ABE`) como cor principal, apoiada por
  azul, verde, roxo e tons terrosos usados em estados específicos
  (concluído, remover, editar, foco)
- Tarefas exibidas como fichas numeradas (Nº 01, Nº 02...)
- Ícones próprios em SVG e microinterações de hover
- Foco de teclado visível e respeito à preferência de redução de
  movimento do usuário (`prefers-reduced-motion`)

## ▶️ Como executar

1. Faça o download ou clone deste repositório
2. Abra o arquivo `index.html` diretamente em qualquer navegador

Não é necessário instalar dependências, servidor ou banco de dados.

## 🚧 Limitações conhecidas

- As tarefas não são salvas de forma permanente (sem persistência de
  dados): ao atualizar a página, a lista é reiniciada
- Não há autenticação de usuários

## 🔭 Possibilidades futuras

- Implementação de armazenamento persistente (ex.: localStorage ou banco de dados)
- Sistema de autenticação de usuários
- Filtro de busca por palavra-chave, além da ordenação já existente
- Integração com outras ferramentas de produtividade

## 👩‍💻 Autora

Rahyssa Alves Meireles e Izaías Aguiar de Lima.
