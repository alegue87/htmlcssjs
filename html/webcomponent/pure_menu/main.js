const template = document.querySelector('template[name="tree"]');
       
class Branch extends HTMLUListElement{
    constructor(){
        super()
    }
}
class LeafButton extends HTMLButtonElement {
    url = ''
    name = ''
    constructor(){
        super()
    }
    setName(name){
        this.textContent = this.name = name
    }
}

class Leaf extends HTMLLIElement {
    name = ''
    leafButton = null

    constructor(){
        super()
        this.leafButton = new LeafButton()
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
        this.leafButton.setName(name)
        this.appendChild(this.leafButton)
    }

    setUrl(url){
        this.leafButton.setUrl(url)
    }

    connectedCallback(){
        //this.addEventListener('click', this.handleClick)
        // viene passato l'oggetto chiamante a leafButton ( leaf )
        this.leafButton.that = this
        this.leafButton.addEventListener('click', this.handleClick)
    }

    handleClick(e){
        const branch = this.that.querySelector('ul')
        const url = e.target.getAttribute('url')
        if(url) {
            //window.location.href = url
            /**
             * Emissione evento 'change-location'
             * 
             * Nota: la chiave 'detail' è la base di accesso all'oggetto custom
             */
            const changeLocation = new CustomEvent('changed-location', { detail: {name: this.name, href: url}})
            window.dispatchEvent(changeLocation)
        }
        if(!branch) return

        const childsLeaf = branch.children

        for( let i = 0 ; i < childsLeaf.length ; i++ ){
            // item(i) è un modo per accedere ad una collection HTML
            // senza prendere altri campi
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

    /**
     * indica se leaf è apicale
     * 
     * @type {Object} leaf
     * 
     * @return {Boolean}
     */
    isLastLeaf(leaf){
        for( let subLeaf in leaf ){
            // c'è un altra leaf in più all'url?
            if(subLeaf != 'url'){
                return false
            }
        }
        return true
    }

    /**
     * Crea leaf
     * 
     * @type {string} name - Nome della Leaf
     * @type {Object} leaf
     * @type {boolean} hide - nasconde / visualizza leaf
     * 
     * @return {Leaf} Elemento Leaf
     */
    createLeaf(name, leaf, hide=true){
        let newLeaf
        newLeaf = new Leaf()
        newLeaf.setName(name, hide)
        if(this.isLastLeaf(leaf)) {
            newLeaf.leafButton.setAttribute('url', leaf['url'])
            return newLeaf
        }

        let branch = new Branch()
        for( let subLeafName in leaf ){
            // salta url per ora
            if(subLeafName=='url'){
                newLeaf.leafButton.setAttribute('url', leaf['url'])
                continue
            }
            branch.append(this.createLeaf(subLeafName, leaf[subLeafName]))
        }
        newLeaf.append(branch)
        return newLeaf
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        const root = this.shadowRoot.querySelector("ul");
        
        let hide
        for( let leafName in treeData){
            root.append(this.createLeaf(leafName, treeData[leafName], hide=false))
        }
        

        //const plantsLeaf = new Leaf()
        //var hide
        //plantsLeaf.setName('Plants', hide=false)
        ////let animals = new Leaf().init('Animals')

        //let plantsBranch = new Branch()
        //plantsLeaf.appendChild(plantsBranch)

        //const roseLeaf = new Leaf()
        //roseLeaf.setName('Rose')
        //const roseBranch = new Branch()
        //const rose1 = new Leaf()
        //rose1.setName `rose 1` // alternativa 
        //const rose2 = new Leaf()
        //rose2.setName('rose 2')
        //roseBranch.append(rose1)
        //roseBranch.append(rose2)
        //roseLeaf.append(roseBranch)

        //const tulipLeaf = new Leaf()
        //tulipLeaf.setName('Tulip')
        //
        //plantsBranch.appendChild(roseLeaf)
        //plantsBranch.appendChild(tulipLeaf)


        //root.appendChild(plantsLeaf)
        
        /**
         * per passare dei parametri a root basta fare:
         * root.param1 = 'valore'
         * 
         * e poi in handleClick(e), utilizzare e.target.param1
         * per accedere al valore.
         */
        root.addEventListener("click", this.handleClick);

        /**
         * Event listener per il cambio di location
         */
        window.addEventListener('changed-location', (e) => {
            console.log(`Changed location, '${e.detail.name}'  '${e.detail.href}'`)
            window.location.href = e.detail.href
        })
    }

    attributeChangedCallback(name, oldVal, newVal){

    }
    
    handleClick(e) {
        console.log(e.target.firstChild.textContent);
    }

}

window.customElements.define('p-tree', Tree);