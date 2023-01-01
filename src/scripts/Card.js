export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.title;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        return cardElement
    }

    _getImage() {
        this._image = this._element.querySelector('.place__image');
        this._image.src = this._link;
        this._image.alt = this._name;
    }

    _setEventListeners() {
        this._like = this._element.querySelector('.place__like-button');
        this._trash = this._element.querySelector('.place__trash');
        this._like.addEventListener('click', (evt) => { evt.target.classList.toggle('place__like-button_active')});
        this._image.addEventListener('click', () => { this.handleCardClick(this._link, this._name) });
        this._trash.addEventListener('click', () => { this._element.remove() });
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._getImage();
        this._element.querySelector('.place__name').textContent = this._name;
        this._setEventListeners();
        return this._element
    }
}