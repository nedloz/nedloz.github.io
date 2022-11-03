const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; // массив с карточками

// сам профиль
const openProfilePopupButton = document.querySelector('.profile__edit-button');
const openCardPopupButton = document.querySelector('.profile__add-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

// место постов
const places = document.querySelector('.places');

// попап профиля 
const profilePopup = document.querySelector('.profile-popup');
const profilePopupForm = profilePopup.querySelector('.popup__form_type_profile');
const profilePopupInputName = profilePopupForm.querySelector('.popup__input_type_profile-name');
const profilePopupInputDescription = profilePopupForm.querySelector('.popup__input_type_profile-description');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button_type_profile');

// Card попап
const cardPopup = document.querySelector('.card-popup');
const cardPopupForm = cardPopup.querySelector('.popup__form_type_card');
const cardPopupInputName = cardPopupForm.querySelector('.popup__input_type_card-name');
const cardPopupInputLink = cardPopupForm.querySelector('.popup__input_type_card-link');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button_type_card');

// попап-картинка
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button_type_image-popup');

// закрытие попапов
const profilePopupClose = () => { profilePopup.classList.remove('popup_opened'); };
const cardPopupClose = () => { cardPopup.classList.remove('popup_opened'); };
const imagePopupClose = () => { imagePopup.classList.remove('popup_opened'); };



// функция добавления поста
const creatPlace = (name, link) => {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  placeElement.style.backgroundImage = `url(${link})`;
  placeElement.querySelector('.place__name').textContent = name;
  placeElement.querySelector('.place__like-button').addEventListener('click', (evt) => { evt.target.classList.toggle('place__like-button_active'); });
  placeElement.querySelector('.place__trash').addEventListener('click', () => { placeElement.classList.add('place_display-none'); });
  placeElement.addEventListener('click', (evt) => {
    if (!(evt.target === placeElement.querySelector('.place__trash') || evt.target === placeElement.querySelector('.place__description') || 
    evt.target === placeElement.querySelector('.place__name') || evt.target === placeElement.querySelector('.place__like-button'))) {
    imagePopupImage.src = link; imagePopupTitle.textContent = name; imagePopupImage.alt = name; imagePopup.classList.add('popup_opened') };
  });
  places.prepend(placeElement);
};

const ProfilePopupFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileDescription.textContent = profilePopupInputDescription.value;
  profilePopupClose();
};

const CardPopupFormSubmitHandler = (evt) => {
  evt.preventDefault(); 
  initialCards.unshift({ name: cardPopupInputName.value, link: cardPopupInputLink.value});
  creatPlace(cardPopupInputName.value, cardPopupInputLink.value);
  cardPopupClose();
};



profilePopupCloseButton.addEventListener('click', profilePopupClose);
cardPopupCloseButton.addEventListener('click', cardPopupClose);
imagePopupCloseButton.addEventListener('click', imagePopupClose);

profileName.textContent = 'Жак-Ив Кусто';
profileDescription.textContent = 'Исследователь океана';

// слушатель кнопки редактирования профиля
openProfilePopupButton.addEventListener('click', () => {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputDescription.value = profileDescription.textContent;
  profilePopup.classList.add('popup_opened');
  profilePopupForm.addEventListener('submit', ProfilePopupFormSubmitHandler);
});

// cлушатель кнопки добавления поста
openCardPopupButton.addEventListener('click', () => {
  cardPopupInputName.value = '';
  cardPopupInputLink.value = '';
  cardPopup.classList.add('popup_opened');
  cardPopupForm.addEventListener('submit', CardPopupFormSubmitHandler);
});

initialCards.forEach((element) => {
  creatPlace(element.name, element.link);
});