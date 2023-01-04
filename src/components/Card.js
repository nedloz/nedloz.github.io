export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.title;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick
        this._toggleLike = this._toggleLike.bind(this)
        this._handleImageClick = this._handleImageClick.bind(this)
        this._deleteCard = this._deleteCard.bind(this)
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

    _toggleLike(evt) {
        evt.target.classList.toggle('place__like-button_active')
    }

    _deleteCard() {
        this.handleCardClick(this._link, this._name)
    }

    _handleImageClick() {
        this._element.remove()
    }


    _setEventListeners() {
        this._like = this._element.querySelector('.place__like-button');
        this._trash = this._element.querySelector('.place__trash');
        this._like.addEventListener('click', this._toggleLike );
        this._image.addEventListener('click', this._deleteCard );
        this._trash.addEventListener('click', this._handleImageClick);
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._getImage();
        this._element.querySelector('.place__name').textContent = this._name;
        this._setEventListeners();
        return this._element
    }
}