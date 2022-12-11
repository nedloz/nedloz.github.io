
export class FormValidator {

    constructor(obj, formElement) {
        this._obj = obj;
        this._element = formElement;
        this._inputList = Array.from(this._element.querySelectorAll(this._obj.inputSelector));
        this._button = this._element.querySelector(this._obj.submitButtonSelector);
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }

    disableButton() {
        this._button.classList.add(this._obj.inactiveButtonClass);
        this._button.disabled = true;
    }

    _enableButton() {
        this._button.classList.remove(this._obj.inactiveButtonClass);
        this._button.disabled = false;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this._enableButton();
        };
    }

    _hideInputError(inputElement, errorElement) {
        inputElement.classList.remove(this._obj.inputErrorClass);
        errorElement.classList.remove(this._obj.errorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputElement, errorElement) {
        inputElement.classList.add(this._obj.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._obj.errorClass);
    }

    _toggleInputErrorState(inputElement) {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorElement);
        } else {
            this._hideInputError(inputElement, errorElement);
        };
    }

    _setEventListeners(inputElement) { 
        inputElement.addEventListener('input', () => {
            this._toggleInputErrorState(inputElement);
            this._toggleButtonState();
        });
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
            this._hideInputError(inputElement, errorElement);
        });
    }

    enableValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._setEventListeners(inputElement);
        });
    }

}