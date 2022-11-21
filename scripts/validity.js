const hasInvalidInput = (inputList) => { return inputList.some((inputElement) => { return !inputElement.validity.valid }) };

const toggleButtonState = (inputList, buttonElement, obg) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obg.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(obg.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const showInputError = (errorElement, inputElement, errorMessage, obg) => {
    inputElement.classList.add(obg.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obg.errorClass);
};

const hideInputError = (errorElement, inputElement, obg) => {
    inputElement.classList.remove(obg.inputErrorClass);
    errorElement.classList.remove(obg.errorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, obg) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(errorElement, inputElement, inputElement.validationMessage, obg);
    } else {
        hideInputError(errorElement, inputElement, obg);
    };
};

const setEventListeners = (formElement, obg) => {
    const inputList = Array.from( formElement.querySelectorAll(obg.inputSelector) );
    const buttonElement = formElement.querySelector(obg.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obg);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, obg);
            toggleButtonState(inputList, buttonElement, obg);
        });
    });
};

const enableValidation = (obg) => {
    const formList = Array.from( document.querySelectorAll(obg.formSelector) );
    formList.forEach((formElement) => { setEventListeners(formElement, obg) });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});