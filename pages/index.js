const openPopupButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = popup.querySelector('.popup__close-button')


openPopupButton.addEventListener('click', function () {
    popup.classList.add('popup_opened')
})

function popupClose() {
    popup.classList.remove('popup_opened')
}
popupCloseButton.addEventListener('click', popupClose)

let formElement = popup.querySelector('.popup__form')

let nameInput = popup.querySelector('.popup__input_name')
let jobInput = popup.querySelector('.popup__input_description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

function formSubmitHandler (evt) {
    evt.preventDefault();

    console.log(nameInput.value);
    console.log(jobInput.value);

    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value

    console.log(profileDescription);
    console.log(profileName);
    popupClose()
}

formElement.addEventListener('submit', formSubmitHandler);
