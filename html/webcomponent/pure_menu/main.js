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
    
    /**
     * Initialize HTMLLIElement Leaf
     * @param {String} name - Name of leaf in tree
     * @param {Boolean} addState - Initial state of leaf ( if is set is 'hidden' )
     * 
     */
    init(name, addState=true){
        this.textContent = name
        if(addState){
            this.classList.add('state', 'hide')
        }
    }

    connectedCallback(){
        this.addEventListener('click', this.handleClick)
    }

    handleClick(e){
        const childsLeaf = this.querySelector('ul').children

        for( let i = 0 ; i < childsLeaf.length ; i++ ){
            const leafClasses = childsLeaf.item(i).classList
            
            if(leafClasses.contains('hide')){
                leafClasses.remove('hide')
                leafClasses.add('grow')
            }
            else {
                leafClasses.remove('grow')
                leafClasses.add('hide')
            }
            console.log(childsLeaf.item(i))
        }
        
    }
}

customElements.define('p-leaf', Leaf, { extends: 'li' })
customElements.define('p-branch', Branch, { extends: 'ul' })



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

        let plantsLeaf = new Leaf()
        var addState;
        plantsLeaf.init('Plants', addState=false)
        //let animals = new Leaf().init('Animals')

        let plantsBranch = new Branch()
        plantsLeaf.appendChild(plantsBranch)

        const roseLeaf = new Leaf()
        roseLeaf.init('Rose')
        const tulipLeaf = new Leaf()
        tulipLeaf.init('Tulip')
        
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