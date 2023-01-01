export const cardTemplateSelector = '.place-template'
export const cardsContainerSelector = '.places'
export const imagePopupSelector = '.image-popup'
export const profilePopupSelector = '.profile-popup'
export const cardPopupSelector = '.card-popup'
export const closeButtons = document.querySelectorAll('.popup__close-button');

export const profileEditButton = document.querySelector('.profile__edit-button')
export const profileAddButton = document.querySelector('.profile__add-button');

export const profileNameSelector = '.profile__name'
export const profileDescriptionSelector = '.profile__description'

export const profilePopupInputName = document.querySelector('#profile-name')
export const profilePopupInputDescription = document.querySelector('#profile-description')

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const initialCards = [
    {
      title: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      title: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      title: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      title: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      title: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      title: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];