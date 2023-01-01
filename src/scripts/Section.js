export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items
        this.renderer = renderer 
        this.container = document.querySelector(containerSelector)
    }

    renderItems() {
        this.items.forEach((item) => {
            this.renderer(item)
        });
    }
    
    addItem(item) {
        this.container.prepend(item)
    }
}