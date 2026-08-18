# Portfólio — Almorio | Designer Multimédia & Developer

Portfólio pessoal desenvolvido para apresentar os meus trabalhos nas áreas de **Design Gráfico, Multimédia, Desenvolvimento Web e Tecnologia**.

O projeto foi criado com **HTML5, CSS3 e JavaScript puro**, sem frameworks, com foco em uma interface moderna, profissional, responsiva e visualmente interativa.

## Tecnologias

* HTML5
* CSS3
* JavaScript
* Responsive Design
* CSS Animations
* JavaScript DOM
* Git & GitHub

## Como executar

1. Abrir a pasta `portfolio/` no VS Code.
2. Instalar a extensão **Live Server**, caso ainda não esteja instalada.
3. Clicar com o botão direito no ficheiro `index.html`.
4. Selecionar **Open with Live Server**.

Também é possível abrir o `index.html` diretamente no navegador.

> Para algumas funcionalidades que utilizam recursos locais, recomenda-se executar o projeto através do Live Server.

## Estrutura do projeto

```text
portfolio/
├── index.html
│
├── css/
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── projects.js
│   ├── animations.js
│   └── gallery.js
│
├── assets/
│   ├── images/
│   │   ├── design/
│   │   ├── projects/
│   │   └── code/
│   ├── icons/
│   └── fonts/
│
└── pages/
    ├── projects.html
    └── contact.html
```

## Organização dos trabalhos

O portfólio está dividido em diferentes áreas para apresentar os meus trabalhos de forma organizada.

### Design

Projetos relacionados com:

* Design Gráfico
* Flyers
* Identidade Visual
* Social Media
* Publicidade
* Composição Visual
* Manipulação de Imagem

### Projetos

Projetos criativos e experimentais desenvolvidos para demonstrar ideias, conceitos e experiências visuais.

### Código

Projetos desenvolvidos através de programação, incluindo:

* Websites
* Interfaces Web
* Experiências interativas
* JavaScript
* Projetos experimentais

## Organização dos projetos

Cada categoria apresenta os trabalhos em grupos de **3 projetos horizontalmente**.

```text
[ Projeto 1 ] [ Projeto 2 ] [ Projeto 3 ]

             Ver mais

[ Projeto 4 ] [ Projeto 5 ] [ Projeto 6 ]

             Ver mais

[ Projeto 7 ] [ Projeto 8 ] [ Projeto 9 ]

             Ver mais
```

Cada categoria possui inicialmente **9 projetos**, organizados em 3 grupos de 3.

O botão **Ver mais** permite carregar mais trabalhos ou encaminhar o utilizador para a página com todos os projetos.

## Adicionar um novo trabalho

Os projetos são gerados através dos dados existentes em:

```text
js/projects.js
```

Não é necessário alterar manualmente o HTML para adicionar um novo projeto.

Exemplo:

```javascript
{
  id: 'flyer-10',
  title: 'Novo Projeto',
  category: 'Flyers',
  categoryId: 'flyers',
  summary: 'Descrição curta do projeto.',
  image: 'assets/images/design/flyers/flyer-10.jpg'
}
```

Depois basta colocar a imagem no caminho correspondente:

```text
assets/images/design/flyers/
```

O sistema identifica automaticamente o conteúdo e cria o card do projeto.

## Sistema de imagens

Caso a imagem de um projeto ainda não exista, o sistema apresenta automaticamente um **placeholder com as iniciais do projeto**.

Quando a imagem real é adicionada ao diretório correspondente, o card passa a utilizar a imagem automaticamente.

Essa lógica é controlada pelo sistema de renderização de projetos em:

```text
js/projects.js
```

## Design visual

A identidade visual do portfólio utiliza uma estética moderna e tecnológica.

### Paleta

* Preto
* Branco
* Azul como cor de destaque
* Cinza como cor secundária

### Tipografia

* **Space Grotesk** — títulos e elementos de destaque
* **Inter** — textos e informações
* **JetBrains Mono** — códigos, labels e elementos técnicos

## Interações

O projeto possui diferentes interações para tornar a apresentação dos trabalhos mais dinâmica.

Entre elas:

* Scroll reveal
* Hover effects
* Cards interativos
* Efeito 3D nos projetos
* Menu responsivo
* Lightbox para imagens
* Transições CSS
* Animações JavaScript

Os efeitos mais pesados são automaticamente reduzidos ou desativados em dispositivos touch para melhorar a experiência em smartphones e tablets.

## Objetivo

Este portfólio não serve apenas para apresentar imagens.

A ideia é demonstrar a combinação entre:

**Design + Multimédia + Programação + Tecnologia.**

O projeto funciona como uma apresentação profissional dos meus trabalhos e também como demonstração das minhas capacidades de desenvolvimento web.

## Autor

**Almorio**

Designer Multimédia • Developer • Tecnologia

Desenvolvido com:

**HTML + CSS + JavaScript**
