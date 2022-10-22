const openPopupButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = popup.querySelector('.popup__close-button')
const formElement = popup.querySelector('.popup__form')
const nameInput = popup.querySelector('.popup__input_type_name')
const jobInput = popup.querySelector('.popup__input_type_description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

function popupClose() {
    popup.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    popupClose()
}

openPopupButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    popup.classList.add('popup_opened')
})

popupCloseButton.addEventListener('click', popupClose)
formElement.addEventListener('submit', formSubmitHandler);
