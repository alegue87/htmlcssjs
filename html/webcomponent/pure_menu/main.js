const template = document.querySelector('template[name="tree"]');
       
class Branch extends HTMLUListElement{
    constructor(){
        super()
    }
}

class Leaf extends HTMLLIElement {
    constructor(){
        super()
    }
    
    name(name){
        this.textContent = name
    }

    connectedCallback(){
        this.addEventListener('click', this.handleClick)
    }

    handleClick(e){
        const childsLeaf = this.querySelector('ul').children

        for( let i = 0 ; i < childsLeaf.length ; i++ ){
            console.log(childsLeaf.item(i))
            childsLeaf.item(i).classList.toggle('hidden')
        }
        
    }
}

customElements.define('p-leaf', Leaf, { extends: 'li' })
customElements.define('p-branch', Branch, { extends: 'ul' })



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

        let plantsLeaf = new Leaf()
        plantsLeaf.name('Plants')
        let animals = new Leaf().name('Animals')

        let plantsBranch = new Branch()
        plantsLeaf.appendChild(plantsBranch)

        const roseLeaf = new Leaf()
        roseLeaf.name('Rose')
        const tulipLeaf = new Leaf()
        tulipLeaf.name('Tulip')
        
        plantsBranch.appendChild(roseLeaf)
        plantsBranch.appendChild(tulipLeaf)

        root.appendChild(plantsLeaf)
        

        root.addEventListener("click", this.handleClick);
    }

    attributeChangedCallback(name, oldVal, newVal){

    }
    
    handleClick(e) {
        console.log(e.target.firstChild.textContent);
    }

}

window.customElements.define('p-tree', Tree);