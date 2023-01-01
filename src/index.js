import './pages/index.css'; 

import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator';
import PopupWithImage from './scripts/PopupWithImage.js'; 
import PopupWithForm from './scripts/PopupWithForm';
import UserInfo from './scripts/UserInfo';

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
  profilePopupInputName,
  profilePopupInputDescription
} from './scripts/Constants.js';


const handleCardClick = (src, name) => {
  const imgPopup = new PopupWithImage(imagePopupSelector)
  imgPopup.openPopup(src, name)
}

const defaultCards = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, handleCardClick);
    const cardEl = card.generateCard();
    defaultCards.addItem(cardEl);
  }
}, cardsContainerSelector );

defaultCards.renderItems();

const userInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector})

const setUserInfo = (data) => {
  userInfo.setUserInfo(data)
}

const getNewCard = (data) => {
  const newCard = new Card(data, cardTemplateSelector, handleCardClick).generateCard()
  defaultCards.addItem(newCard)
}

const handleEditButtonClick = () => {
  const profPopup = new PopupWithForm(profilePopupSelector, setUserInfo)
  const oldUserInfo = userInfo.getUserInfo()
  profilePopupInputName.value = oldUserInfo.name
  profilePopupInputDescription.value = oldUserInfo.description
  profPopup.openPopup()
}

const handleAddButtonClick = () => {
  const cardPopup = new PopupWithForm(cardPopupSelector, getNewCard)
  cardPopup.openPopup()
}

profileEditButton.addEventListener('click', handleEditButtonClick)
profileAddButton.addEventListener('click', handleAddButtonClick)


const formValidators = {};
const formList = Array.from(document.querySelectorAll(config.formSelector));


formList.forEach((form) => {
  const validator = new FormValidator(config, form) 
  const formName = form.getAttribute('name')
  formValidators[formName] = validator
})

const enableValidation = () => {
  formList.forEach((form) => {
    const formName = form.getAttribute('name')
    formValidators[formName].enableValidation()
  })
}

