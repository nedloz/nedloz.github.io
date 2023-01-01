// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ]; // массив с карточками
// import './pages/index.css';


// // сам профиль
// const openProfilePopupButton = document.querySelector('.profile__edit-button');
// const openCardPopupButton = document.querySelector('.profile__add-button');
// const profileName = document.querySelector('.profile__name');
// const profileDescription = document.querySelector('.profile__description');

// // место постов
// const cardsContainer = document.querySelector('.places');

// // попап профиля 
// const profilePopup = document.querySelector('.profile-popup');
// const profilePopupForm = document.forms['profile-form'];
// const profilePopupInputName = profilePopupForm.profileName;
// const profilePopupInputDescription = profilePopupForm.profileDescription;

// // Card попап
// const cardPopup = document.querySelector('.card-popup');
// const cardPopupForm = document.forms['card-form'];
// const cardPopupInputName = cardPopupForm.cardPopupName;
// const cardPopupInputLink = cardPopupForm.cardPopupLink;
// const cardPopupButton = cardPopup.querySelector('.popup__button');

// // все кнопки закрытия
// const closeButtons = document.querySelectorAll('.popup__close-button');

// // первоначальные значения имени и описния профиля
// profileName.textContent = 'Жак-Ив Кусто';
// profileDescription.textContent = 'Исследователь океана';

// const config = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// };


import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';



// массив со всеми валидаторами
const formValidators = {};
// список всех форм
const formList = Array.from(document.querySelectorAll(config.formSelector));

// заполнение formValidators
formList.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  const formName = formElement.getAttribute('name');
  formValidators[formName] = validator;
});


// закрытие попапа по клику на оверлей
const closePopupByOverlayClick = (evt) => { 
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

// закрытие попапа по Esc
const closePopupByEscape = (key) => { 
  if (key.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

// логика закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape );
  popup.removeEventListener('mousedown', closePopupByOverlayClick );
};


// открытие попапа 
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape );
  popup.addEventListener('mousedown', closePopupByOverlayClick );
};

// функция создания карточки
const creatCard = (name, link) => {
  const cardElement = new Card( name, link, '.place-template' ).generateCard();
  return cardElement;
}

// функция добавление карточки в DOM
const createPlace = (name, link) => {
  cardsContainer.prepend( creatCard(name, link) );
};

// логика вставки новых значений в профиль
const handleProfilePopupForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileDescription.textContent = profilePopupInputDescription.value;
  closePopup(profilePopup);
};

// логика добавления новой карточки с 
const handleCardPopupForm = (evt) => {
  evt.preventDefault(); 
  createPlace(cardPopupInputName.value, cardPopupInputLink.value);
  closePopup(cardPopup);
  evt.target.reset();
  formValidators[cardPopupForm.name].disableButton();
};

// логика открытия Card попапа 
openCardPopupButton.addEventListener('click', () => {
  openPopup(cardPopup);
  formValidators[cardPopupForm.name].resetValidation();
});


// логика открытия попапа профиля
openProfilePopupButton.addEventListener('click', () => {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
});

// слушатели сабмитов
profilePopupForm.addEventListener('submit', handleProfilePopupForm);
cardPopupForm.addEventListener('submit', handleCardPopupForm);

// общая логика работы крестиков
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// функция валидации
const enableValidation = () => {
  formList.forEach((form) => {
    formValidators[form.name].enableValidation();
  });
}

enableValidation();
initialCards.forEach((element) => { createPlace(element.name, element.link) });