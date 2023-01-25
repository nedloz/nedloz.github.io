export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector
        this.popup = document.querySelector(popupSelector)
        this.closebutton = this.popup.querySelector('.popup__close-button')
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }

    openPopup() {
        this.popup.classList.add('popup_opened')
        this._setEventListeners()
    }

    closePopup() {
        this.popup.classList.remove('popup_opened')
        this._removeEventListeners()
    }


    _handleEscClose(evt) {
        if (evt.key === 'Escape') { 
            this.closePopup()
        };
    }

    _handleOverlayClose(evt) {
        if ( evt.target === evt.currentTarget) { 
            this.closePopup()
        };
    }

    _removeEventListeners() {
        this.closebutton.removeEventListener('click', this.closePopup)
        document.removeEventListener('keydown',  this._handleEscClose)
        this.popup.removeEventListener('mousedown', this._handleOverlayClose)
    }

    _setEventListeners() {
        this.closebutton.addEventListener('click', this.closePopup)
        document.addEventListener('keydown', this._handleEscClose)
        this.popup.addEventListener('mousedown', this._handleOverlayClose)
    }
    
}