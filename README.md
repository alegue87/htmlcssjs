---
description: test&co
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# htmlcssjs

## Commits:

[variazione di stato di un elemento con animazione css](https://github.com/alegue87/htmlcssjs/commit/38089b4c021c4009a73801d2ff470f6419347974)

Lo classe iniziale per ogni leaf eccetto quella di base è <mark style="color:blue;">'state hide'</mark>, questo viene viariato al click sullo stesso elemento aggiungendo/rimuovendo <mark style="color:blue;">grow</mark> o <mark style="color:blue;">hide</mark>.

Queste due classi non fanno altro che settare la variabile css `--display` a none o block che a loro volta modificano la classe <mark style="color:blue;">state</mark>.

```css
.grow {
  --display:block;
  opacity:1;
  animation: change 0.5s ease;
}
.hide {
  --display:none;
}

.state {
  display:var(--display, none)
}
```

La classe grow contiene anche una animazione che viene attivata nel momento in cui `display` è un `block.`

```css
@keyframes change {
  from { opacity:0; }
  to { opacity:1; } 
}

```

sem

***
