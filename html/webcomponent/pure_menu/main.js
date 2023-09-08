const template = document.querySelector('template[name="tree"]');
       
class Branch extends HTMLUListElement{
    constructor(){
        super()
    }
}
class LeafButton extends HTMLButtonElement {
    constructor(){
        super()
    }
    setName(name){
        this.textContent = name
    }
}

class Leaf extends HTMLLIElement {
    name = ''
    leafButton = null

    constructor(){
        super()
    }
    
    /**
     * Initialize HTMLLIElement Leaf
     * @param {String} name- Name of leaf in tree
     * @param {Boolean} hide - default is true
     * 
     */
    setName(name, hide=true){
        //this.textContent = name
        if(hide){
            this.classList.add('hide')
        }
        this.leafButton = new LeafButton()
        this.leafButton.setName(name)
        this.appendChild(this.leafButton)
    }

    connectedCallback(){
        //this.addEventListener('click', this.handleClick)
        // viene passato l'oggetto chiamante a leafButton ( leaf )
        this.leafButton.that = this
        this.leafButton.addEventListener('click', this.handleClick)
    }

    handleClick(e){
        const branch = this.that.querySelector('ul')
        if(!branch) return

        const childsLeaf = branch.children

        for( let i = 0 ; i < childsLeaf.length ; i++ ){
            const leaf = childsLeaf.item(i)
            
            leaf.classList.toggle('hide')
            console.log(leaf)
        }
    }
}

customElements.define('p-leaf', Leaf, { extends: 'li' })
customElements.define('p-branch', Branch, { extends: 'ul' })
customElements.define('p-leaf-button', LeafButton, { extends: 'button' })


class Tree extends HTMLElement {
    /**
     * Costruttore
     * 
     * DESIGN NOTES
     * Necessario chiamare super() per accedere a this
     */
    constructor(){
        super()
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        const root = this.shadowRoot.querySelector("ul");

        const plantsLeaf = new Leaf()
        var hide
        plantsLeaf.setName('Plants', hide=false)
        //let animals = new Leaf().init('Animals')

        let plantsBranch = new Branch()
        plantsLeaf.appendChild(plantsBranch)

        const roseLeaf = new Leaf()
        roseLeaf.setName('Rose')
        const roseBranch = new Branch()
        const rose1 = new Leaf()
        rose1.setName `rose 1` // alternativa 
        const rose2 = new Leaf()
        rose2.setName('rose 2')
        roseBranch.append(rose1)
        roseBranch.append(rose2)
        roseLeaf.append(roseBranch)

        const tulipLeaf = new Leaf()
        tulipLeaf.setName('Tulip')
        
        plantsBranch.appendChild(roseLeaf)
        plantsBranch.appendChild(tulipLeaf)


        root.appendChild(plantsLeaf)
        
        /**
         * per passare dei parametri a root basta fare:
         * root.param1 = 'valore'
         * 
         * e poi in handleClick(e), utilizzare e.target.param1
         * per accedere al valore.
         */
        root.addEventListener("click", this.handleClick);
    }

    attributeChangedCallback(name, oldVal, newVal){

    }
    
    handleClick(e) {
        console.log(e.target.firstChild.textContent);
    }

}

window.customElements.define('p-tree', Tree);