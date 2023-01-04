import './index.css'; 

import Section from '../components/Section';
import Card from '../components/Card'
import FormValidator from '../components/FormValidator';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

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


const defaultCards = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardEl = createCard(item)
    defaultCards.addItem(cardEl);
  }
}, cardsContainerSelector );
defaultCards.renderItems();


const userInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector})

const setUserInfo = (data) => {
  userInfo.setUserInfo(data)
}

const getNewCard = (data) => {
  const newCard = createCard(data)
  defaultCards.addItem(newCard)
}

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