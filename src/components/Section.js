export default class Section {
    constructor({ renderer }, containerSelector) {  
        // this.items = items
        this.renderer = renderer 
        this.container = document.querySelector(containerSelector)
        
    }

    renderItems(items) {
        items.forEach((item) => {
            this.renderer(item)
        });
    }
    
    addItem(item) {
        this.container.prepend(item)
    }
}