import './index.css';

import Section from '../components/Section';
import Card from '../components/Card'
import FormValidator from '../components/FormValidator';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

import {
  config, 
  profilePopupSelector, cardPopupSelector, updateAvatarPopupSelector, confirmPopupSelector,
  imagePopupSelector, cardTemplateSelector, 
  profileNameSelector, profileDescriptionSelector, 
  profileImagePlace, 
  avatarEditButton, profileEditButton, profileAddButton, popupButton,
  cardsContainerSelector
} from '../utils/Constants';


const formValidators = {};
const formList = Array.from(document.querySelectorAll(config.formSelector));

formList.forEach((form) => {
  const validator = new FormValidator(config, form);
  const formName = form.getAttribute('name');
  formValidators[formName] = validator;
})
const enableValidation = () => {
  formList.forEach((form) => {
    const formName = form.getAttribute('name')
    formValidators[formName].enableValidation()
  })
}


const setCards = (obj, userID) => {
  const section = createSection(userID)
  section.renderItems(obj)
}
const setProfileInfo = (obj) => {
  userInfo.setUserInfo(obj)
  userInfo.setUserImage(obj.avatar)
}


const handleAddButtonClick = () => {
  formValidators['card-form'].resetValidation()
  cardPopup.openPopup()
}
const handleProfileEditButtonClick = () => {
  const oldUserInfo = userInfo.getUserInfo()
  profilePopup.setInputValues(oldUserInfo)
  profilePopup.openPopup()
}
const handleAvatarEditButtonClick = () => {
  formValidators['update-avatar-form'].resetValidation
  updateAvatarPopup.openPopup()
}


const handleCardClick = (src, name) => {
  imgPopup.openPopup(src, name);
}
const handleLikeClick = (likeState, cardId) => {
  if (likeState) {
    return api.setLike(cardId)
      .catch(err => console.log(err))
  } else {
    return api.removeLike(cardId)
      .catch(err => console.log(err))
  }
}
const handleTrashClick = (cardId) => {
  confirmPopup.openPopup(cardId)
}

const createCard = (item, userID) => { 
  const card = new Card(item, userID, cardTemplateSelector, handleCardClick, handleTrashClick, handleLikeClick);
  const cardEl = card.generateCard();
  return cardEl
}


const getNewCard = (data) => {
  return api.sendNewCard(data)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    const newCard = createCard(data, userId)
    const container = document.querySelector(cardsContainerSelector)
    container.prepend(newCard)
  })
  .catch(err => console.log(err))
}
const setUserInfo = (data) => {
  return api.sendUserInfo(data)
    .then(() => userInfo.setUserInfo(data))
    .catch(err => console.log(err))
}
const setAvatarImage = (link) => {
  return api.sendUserAvatar(link)
    .then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
    .then(res => setProfileInfo(res))
    .catch(err => console.log(err))
}
const deleteCard = (cardId) => {
  api.deleteCard(cardId)
  .catch(err => console.log(err))
  .then(setDefaultCards(userId))
}


const confirmPopup =  new PopupWithConfirmation(confirmPopupSelector, popupButton, deleteCard)

const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, setAvatarImage)
const profilePopup = new PopupWithForm(profilePopupSelector, setUserInfo);
const cardPopup = new PopupWithForm(cardPopupSelector, getNewCard);

const imgPopup = new PopupWithImage(imagePopupSelector);
const userInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector, image: profileImagePlace});

const createSection = (userID) => { 
  const section = new Section({
    renderer: (data) => {
      const newCard = createCard(data, userID)
      section.addItem(newCard)
    }
  }, cardsContainerSelector)
  return section
}

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

const setDefaultCards = (userID) => {
  api.getCardsinfo()
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => setCards(res, userID))
  .catch(err => console.log(err))
}
const userId = api.getUserInfo()
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => res._id)
  .catch(err => console.log(err))


api.getUserInfo()
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    setProfileInfo(res)
    setDefaultCards(res._id)
  })
  // .then(res => setDefaultCards(res._id))

  .catch(err => console.log(err))


enableValidation()