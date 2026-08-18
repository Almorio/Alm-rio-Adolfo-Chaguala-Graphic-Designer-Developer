# Portfólio — Ana Duarte (Graphic Designer & Developer)

Site de portfólio estático, feito com **HTML5, CSS3 e JavaScript puro** (sem frameworks).

## Como executar

1. Abrir a pasta `portfolio/` no VS Code.
2. Instalar a extensão **Live Server** (se ainda não tiver).
3. Clicar com o botão direito em `index.html` → **Open with Live Server**.

Ou, sem VS Code, basta abrir `index.html` diretamente no navegador (algumas funcionalidades, como `fetch` de imagens locais, funcionam melhor servidas por um servidor local).

## Estrutura

```
portfolio/
├── index.html            página principal (todas as secções)
├── css/
│   ├── style.css         tokens, layout e componentes
│   ├── animations.css    keyframes e transições
│   └── responsive.css    breakpoints (desktop/tablet/mobile)
├── js/
│   ├── main.js           navegação, menu mobile, inicialização das secções
│   ├── projects.js       dados (design/projetos/código) + renderização
│   ├── animations.js     scroll reveal + efeito 3D nos cards
│   └── gallery.js        lightbox dos flyers
├── assets/
│   ├── images/           design/, projects/, code/
│   ├── icons/
│   └── fonts/
└── pages/
    ├── projects.html     página dedicada a todos os projetos
    └── contact.html      página dedicada de contacto
```

## Adicionar um novo trabalho

Todos os cards são gerados a partir de estruturas de dados em `js/projects.js`.
Não é preciso tocar no HTML — basta editar os arrays:

```javascript
// Um novo flyer, por exemplo, dentro de buildDesignItems / DESIGN_DATA
{
  id: 'flyers-10',
  title: 'Flyers 10',
  category: 'Flyers',
  categoryId: 'flyers',
  summary: 'Descrição curta do trabalho.',
  image: 'assets/images/design/flyers/flyers-10.jpg',
}
```

Enquanto a imagem real não existir em `assets/images/...`, o card mostra
automaticamente um placeholder com as iniciais do título — basta colocar o
ficheiro de imagem no caminho indicado que ele substitui o placeholder
sozinho (ver `buildMedia()` em `js/projects.js`).

## Notas

- Paleta: preto / branco / azul (destaque), cinza como cor secundária.
- Tipografia: Space Grotesk (display), Inter (corpo), JetBrains Mono (labels/código).
- O efeito 3D dos cards de projeto e os hovers mais elaborados são
  desativados automaticamente em dispositivos touch (ver `responsive.css`
  e a verificação `hover: none` em `animations.js`).
- Cada bloco de 3 trabalhos tem o seu próprio botão **Ver mais**, conforme
  pedido — a categoria completa tem 9 itens, em 3 blocos de 3.
