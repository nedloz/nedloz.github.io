import { openPopup } from "./index.js";

const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
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

    _handleOpenPopup() {
        imagePopupImage.src = this._link;
        imagePopupImage.alt = this._name;
        imagePopupTitle.textContent = this._name;
        openPopup(imagePopup);
    }

    _setEventListeners() {
        this._like = this._element.querySelector('.place__like-button');
        this._trash = this._element.querySelector('.place__trash');
        this._like.addEventListener('click', (evt) => { evt.target.classList.toggle('place__like-button_active')});
        this._image.addEventListener('click', () => { this._handleOpenPopup() });
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