const disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
}
const enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false; 
}


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid }) };

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass)
    } else {
        enableButton(buttonElement, inactiveButtonClass)
    }
};

const showInputError = (errorElement, inputElement, errorMessage, obj) => {
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

const hideInputError = (errorElement, inputElement, obj) => {
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
}

const toggleInputErrorState = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(errorElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(errorElement, inputElement, obj);
    };
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from( formElement.querySelectorAll(obj.inputSelector) );
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    const inactiveButtonClass = obj.inactiveButtonClass
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleInputErrorState(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from( document.querySelectorAll(obj.formSelector) );
    formList.forEach((formElement) => { setEventListeners(formElement, obj) });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});