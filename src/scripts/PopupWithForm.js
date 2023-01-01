import Popup from "./Popup"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector)
        this.submitCallBack = submitCallBack
        this.popup = document.querySelector(popupSelector)
        this.form = this.popup.querySelector('.popup__form')
        this.inputs = Array.from(this.popup.querySelectorAll('.popup__input'))
        this._getInputValues = this._getInputValues.bind(this)
    }

    _getInputValues(evt) {
        evt.preventDefault()
        const inputValuesList = {}
        this.inputs.forEach((input) => {
            inputValuesList[input.name] = input.value  
        })
        this.submitCallBack(inputValuesList)
        this.closePopup()
    }

    setEventListeners() {
        super.setEventListeners()
        this.popup.addEventListener('submit', this._getInputValues)
    }

    closePopup() {
        super.closePopup()
        this.form.reset()
        this.popup.removeEventListener('submit', this._getInputValues)
    }
    
}