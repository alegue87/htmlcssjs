# WebComponent

Importazione dello stile da file esterno

```html
<template name="tree">
        <link rel="stylesheet" href="./pure.css"/>
        <ul class="tree"></ul>
</template>
```

Non è possibile importare lo script ( js ) nella stessa maniera.

La struttura base di un componente è cosi definita:

{% code lineNumbers="true" %}
```javascript
class Tree extends HTMLElement {
    // proprietà accessibili con this.
    // p1 = 'abc'
    // p2
    //...

    constructor(){
        super()
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        const root = this.shadowRoot.querySelector("ul");

        root.addEventListener("click", this.handleClick);
    }

    attributeChangedCallback(name, oldVal, newVal){

    }
    
    handleClick(e) {
        console.log(e.target.firstChild.textContent);
    }

}

window.customElements.define('p-tree', Tree);
```
{% endcode %}

La linea 30 indica la registrazione del componente p-tree utilizzabile come tag nell'html:

`<p-tree/>`

<mark style="color:yellow;">Nota: deve essere strutturato '\*-nome' altrimenti da problemi.</mark>

I metodi&#x20;

* `connectedCallback()` viene chiamato al montaggio
* `attributeChangedCallback()` al cambiamento di un attributo

