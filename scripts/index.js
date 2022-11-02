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

const popup = document.querySelector('.popup');// весь попап ---
const formElement = popup.querySelector('.popup__form');// форма попапа

const popupCloseButton = popup.querySelector('.popup__close-button');// кнопка закрытия попапа
const popupTitle = popup.querySelector('.popup__title');// название попапа ---
const firstInput = popup.querySelector('.popup__input_type_name');// первый input попапа
const secondInput = popup.querySelector('.popup__input_type_description');// второй input попапа
const openPopupButton = document.querySelector('.profile__edit-button');// кнопка редактирования в профиле ---
const addPlaceButton = document.querySelector('.profile__add-button');// кнопка добавления в профиле
let profileName = document.querySelector('.profile__name');// имя профиля
let profileDescription = document.querySelector('.profile__description');// описание профиля
const places = document.querySelector('.places'); // коробка с карточками ----
const imagePopup = document.querySelector('.popup-image'); // попап-картинка ----
const imagePopupImage = imagePopup.querySelector('.popup-image__image'); // картинка попапа-картинки
const imagePopupTitle = imagePopup.querySelector('.popup-image__title'); // название попапа-картинки
const imagePopupCloseButton = imagePopup.querySelector('.popup-image__close-button'); // кнопка закрытия попапа-картинки

const popupClose = () => { popup.classList.remove('popup_opened'); };
// ребята которые читают стихи пользователя
profileName.textContent = 'Жак-Ив Кусто';
profileDescription.textContent = 'Исследователь океана';

const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = firstInput.value;
  profileDescription.textContent = secondInput.value;
  popupClose();
};

const formSubmitHandlerNewPlace = (evt) => {
  evt.preventDefault(); 
  initialCards.unshift({ name: firstInput.value, link: secondInput.value});
  creatPlace(firstInput.value, secondInput.value);
  popupClose();
};



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


// слушатель кнопки редактирования профиля
openPopupButton.addEventListener('click', () => {
  popupTitle.textContent = 'Редактировать профиль';
  firstInput.placeholder = 'Имя';
  secondInput.placeholder = 'Професстия';
  firstInput.value = profileName.textContent;
  secondInput.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
  formElement.addEventListener('submit', formSubmitHandlerProfile);
});

// cлушатель кнопки добавления поста
addPlaceButton.addEventListener('click', () => {
  popupTitle.textContent = 'Новое место';
  firstInput.placeholder = 'Название';
  secondInput.placeholder = 'Ссылка на картинку';
  firstInput.value = '';
  secondInput.value = '';
  popup.classList.add('popup_opened');
  formElement.addEventListener('submit', formSubmitHandlerNewPlace);
});

// закрытие попапов
popupCloseButton.addEventListener('click', popupClose);
imagePopupCloseButton.addEventListener('click', () => { imagePopup.classList.remove('popup_opened'); });

initialCards.forEach((element) => {
  creatPlace(element.name, element.link);
});