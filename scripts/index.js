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
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// место постов
const cardsContainer = document.querySelector('.places');

// попап профиля 
const profilePopup = document.querySelector('.profile-popup');
const profilePopupForm = document.forms['profilePopupForm'];
const profilePopupInputName = profilePopupForm.profileName;
const profilePopupInputDescription = profilePopupForm.profileDescription;

// Card попап
const cardPopup = document.querySelector('.card-popup');
const cardPopupForm = document.forms['cardPopupForm'];
const cardPopupInputName = cardPopupForm.cardPopupName;
const cardPopupInputLink = cardPopupForm.cardPopupLink;

// попап-картинка
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button_type_image-popup');

// все крестики попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

// первоначальные значения имени и описния профиля
profileName.textContent = 'Жак-Ив Кусто';
profileDescription.textContent = 'Исследователь океана';


// открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

// закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

// создание карточки
const createCard = (nam, lin) => {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image');
  placeImage.src = lin;
  placeImage.alt = nam;
  placeElement.querySelector('.place__name').textContent = nam;
  placeElement.querySelector('.place__like-button').addEventListener('click', (evt) => { evt.target.classList.toggle('place__like-button_active'); });
  const trash = placeElement.querySelector('.place__trash')
  trash.addEventListener('click', () =>{ placeElement.remove(); });
  placeImage.addEventListener('click', () => {
    imagePopupImage.src = lin;
    imagePopupImage.alt = nam;
    imagePopupTitle.textContent = nam;
    openPopup(imagePopup); 
  });
  return placeElement;
};

// добавление карточки
const createPlace = (name, link) => {
  cardsContainer.prepend(createCard(name, link));
};


const handleProfilePopupForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileDescription.textContent = profilePopupInputDescription.value;
  closePopup(profilePopup);
};

const handleCardPopupForm = (evt) => {
  evt.preventDefault(); 
  createPlace(cardPopupInputName.value, cardPopupInputLink.value);
  closePopup(cardPopup);
  evt.target.reset();
};

// слушатели кнопок в профиле
openCardPopupButton.addEventListener('click', () => { openPopup(cardPopup); });
openProfilePopupButton.addEventListener('click', () => {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
});

profilePopupForm.addEventListener('submit', handleProfilePopupForm);
cardPopupForm.addEventListener('submit', handleCardPopupForm);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach((element) => {
  createPlace(element.name, element.link);
});