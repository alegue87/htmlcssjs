# Commits

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

***

[Inserito button per ogni leaf](https://github.com/alegue87/htmlcssjs/commit/4299f64c778aa1405452662d578b2e9106dc46ba)

Per evitare di aprire/chiudere l'intera alberatura anche con la selezione di leaf lontane dalla base, viene inserito un button che limita il click.

La creazione del button, al momento avviene al setName del leaf ( forse è meglio al momento del mount, connectedCallback ), comunque al click sul button vengono aperte/chiuse tutti i child del leaf che contiene il button stesso.

```javascript
// in connectedCallback di Leaf
this.leafButton.that = this
this.leafButton.addEventListener('click', this.handleClick)
```

```javascript
// in handleClick di Leaf
const branch = this.that.querySelector('ul')
// toggle dei children del branch ( leaf )
```

&#x20;

<figure><img src="../.gitbook/assets/Schermata del 2023-09-08 14-56-00.png" alt=""><figcaption></figcaption></figure>

In pratica Plants, Rose, rose1 ecc.. sono Leaf (LI) contenenti Branch (UL) che a loro volta contengo Leaf... L'apertura avviene sul click del LeafButton che prende il Branch del padre che lo contiene e tutti Leaf childreen.
