import './index.css';

import Section from '../components/Section';
import Card from '../components/Card'
import FormValidator from '../components/FormValidator';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

import {
  config, 
  profilePopupSelector, cardPopupSelector, updateAvatarPopupSelector,
  imagePopupSelector, cardTemplateSelector, 
  profileNameSelector, profileDescriptionSelector, 
  profileImagePlace, 
  avatarEditButton, profileEditButton, profileAddButton,
  cardsContainerSelector

} from '../utils/Constants';





const formValidators = {};
const formList = Array.from(document.querySelectorAll(config.formSelector));

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  const formName = form.getAttribute('name');
  formValidators[formName] = validator;
})

const handleCardClick = (src, name) => { // коллбек открытия попапа картинки
  imgPopup.openPopup(src, name);
}

const createCard = (item) => { 
  const card = new Card(item, cardTemplateSelector, handleCardClick); // создание карточки из массива с name и link. Возвращает карточку
  const cardEl = card.generateCard();
  return cardEl
}


const handleAvatarEditButtonClick = () => {
  formValidators['update-avatar-form'].resetValidation
  updateAvatarPopup.openPopup()
}

const handleProfileEditButtonClick = () => { // открытие попапа профиля
  const oldUserInfo = userInfo.getUserInfo()
  profilePopup.setInputValues(oldUserInfo)
  profilePopup.openPopup()
}

const handleAddButtonClick = () => { // открытие попапа карточки
  formValidators['card-form'].resetValidation()
  cardPopup.openPopup()
}

const enableValidation = () => {
  formList.forEach((form) => {
    const formName = form.getAttribute('name')
    formValidators[formName].enableValidation()
  })
}

const setAvatarImage = (link) => {
  api.sendUserAvatar(link)
    .then(userInfo.setUserImage(link))
    .catch(err => console.log(err))
}

const setUserInfo = (data) => {
  api.sendUserInfo(data)
    .then(userInfo.setUserInfo(data))
    .catch(err => console.log(err))
}

const getNewCard = (data) => { // обьединение двух действий добавления карточки. создания и добавления
  const newCard = createCard(data)
  section.addItem(newCard)
}




const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, setAvatarImage)
const profilePopup = new PopupWithForm(profilePopupSelector, setUserInfo);
const cardPopup = new PopupWithForm(cardPopupSelector, getNewCard);
const imgPopup = new PopupWithImage(imagePopupSelector);
const userInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector, image: profileImagePlace});
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: 'dbacfcec-34ad-4656-89f8-d0ca1da81c55',
    'Content-Type': 'application/json'
  }
})


avatarEditButton.addEventListener('click', handleAvatarEditButtonClick)
profileEditButton.addEventListener('click', handleProfileEditButtonClick)
profileAddButton.addEventListener('click', handleAddButtonClick)

enableValidation()


api.getUserInfo()
  .then(res => res.json())
  .then(res => setProfileInfo(res))
  .catch(err => console.log(err))

api.getCardsinfo()
  .then(res => res.json())
  .then(res => setCards(res))
  .catch(err => console.log(err))




const setProfileInfo = (obj) => {
  userInfo.setUserInfo(obj)
  userInfo.setUserImage(obj.avatar)
}

const setCards = (obj) => {
  const section = new Section({
    items: obj, 
    renderer: (item) => {
      const cardEl = createCard(item)
      section.addItem(cardEl)
    }
  }, cardsContainerSelector)
  section.renderItems()
}



// работа с изначальным массивом и добавление карточкек в контейнер
// const defaultCards = new Section ({
//   items: initialCards,
//   renderer: (item) => {
//     const cardEl = createCard(item)
//     defaultCards.addItem(cardEl);
//   }
// }, cardsContainerSelector );
// defaultCards.renderItems();
