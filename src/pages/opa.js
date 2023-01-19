import './index.css'; 

import Section from '../components/Section';
import Card from '../components/Card'
import FormValidator from '../components/FormValidator';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

import {
  initialCards,
  config,
  cardTemplateSelector,
  cardsContainerSelector,
  imagePopupSelector,
  profileEditButton,
  profilePopupSelector,
  profileAddButton,
  cardPopupSelector,
  profileNameSelector,
  profileDescriptionSelector,
  profileImagePlace,
} from '../utils/Constants'


const formValidators = {};
const formList = Array.from(document.querySelectorAll(config.formSelector));

formList.forEach((form) => {
  const validator = new FormValidator(config, form) 
  const formName = form.getAttribute('name')
  formValidators[formName] = validator
})


const handleCardClick = (src, name) => {
  imgPopup.openPopup(src, name)
}

const createCard = (item) => {
  const card = new Card(item, cardTemplateSelector, handleCardClick);
  const cardEl = card.generateCard();
  return cardEl 
}


// const defaultCards = new Section ({
//   items: initialCards,
//   renderer: (item) => {
//     const cardEl = createCard(item)
//     defaultCards.addItem(cardEl);
//   }
// }, cardsContainerSelector );
// defaultCards.renderItems();


const userInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector, image: profileImagePlace})

const setUserInfo = (data) => {
  userInfo.setUserInfo(data)
}

const getNewCard = (data) => {
  const newCard = createCard(data)
  defaultCards.addItem(newCard)
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: 'dbacfcec-34ad-4656-89f8-d0ca1da81c55',
    'Content-Type': 'application/json'
  }
})

const setProfileInfo = (obj) => {
  obj.description = obj.about
  userInfo.setUserInfo(obj)
  userInfo.setUserImage(obj.avatar)
}
const cont = document.querySelector(cardsContainerSelector)
const setCards = (obj) => {
  obj.forEach(item => {
    
  })
}

api.getUserInfo()
  .then(res => res.json())
  .then(res => setProfileInfo(res))
  .catch(err => console.log(err))

api.getCardsinfo()
  .then(res => res.json())
  .then(res => setCards(res))
  .catch(err => console.log(err))



const profilePopup = new PopupWithForm(profilePopupSelector, setUserInfo)
const cardPopup = new PopupWithForm(cardPopupSelector, getNewCard)
const imgPopup = new PopupWithImage(imagePopupSelector)


const handleEditButtonClick = () => {
  const oldUserInfo = userInfo.getUserInfo()
  profilePopup.setInputValues(oldUserInfo)
  profilePopup.openPopup()
}

const handleAddButtonClick = () => {
  formValidators['card-form'].resetValidation()
  cardPopup.openPopup()
}

profileEditButton.addEventListener('click', handleEditButtonClick)
profileAddButton.addEventListener('click', handleAddButtonClick)


const enableValidation = () => {
  formList.forEach((form) => {
    const formName = form.getAttribute('name')
    formValidators[formName].enableValidation()
  })
}

enableValidation()