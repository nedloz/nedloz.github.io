// const closePopupByOverlayClick = (evt) => { 
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.currentTarget);
//   };
// };
// const closePopupByEscape = (key) => { 
//   if (key.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     closePopup(popup);
//   }
// };
// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEscape );
//   popup.removeEventListener('mousedown', closePopupByOverlayClick );
// };
// export const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEscape );
//   popup.addEventListener('mousedown', closePopupByOverlayClick );
// };
// const handleProfilePopupForm = (evt) => {
//   evt.preventDefault();
//   profileName.textContent = profilePopupInputName.value;
//   profileDescription.textContent = profilePopupInputDescription.value;
//   closePopup(profilePopup);
// };
// const handleCardPopupForm = (evt) => {
//   evt.preventDefault(); 
//   createPlace(cardPopupInputName.value, cardPopupInputLink.value);
//   closePopup(cardPopup);
//   evt.target.reset();
//   formValidators[cardPopupForm.name].disableButton();
// };submit
// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });


// const CardInputs = Array.from(cardPopup.querySelectorAll('.popup__input'))
// const a =  new PopupWithForm('card-popup')._getInputValues(CardInputs)

// const formValidators = {};
// const formList = Array.from(document.querySelectorAll(config.formSelector));

// formList.forEach((formElement) => {
//   const validator = new FormValidator(config, formElement);
//   const formName = formElement.getAttribute('name');
//   formValidators[formName] = validator;
// });

// const enableValidation = () => {
//   formList.forEach((form) => {
//     formValidators[form.name].enableValidation();
//   });
// }
// // enableValidation();






// const creatCard = (name, link) => {
//   const cardElement = new Card( name, link, '.place-template' ).generateCard();
//   return cardElement;
// }
// // добавление 1й карточки
// const createPlace = (name, link) => {
//   cardsContainer.prepend( creatCard(name, link) );
// };
// // слушатели кнопок в профиле
// openCardPopupButton.addEventListener('click', () => {
//   openPopup(cardPopup);
//   formValidators[cardPopupForm.name].resetValidation();
// });

// openProfilePopupButton.addEventListener('click', () => {
//   profilePopupInputName.value = profileName.textContent;
//   profilePopupInputDescription.value = profileDescription.textContent;
//   openPopup(profilePopup);
// });

// profilePopupForm.addEventListener('submit', handleProfilePopupForm);
// cardPopupForm.addEventListener('submit', handleCardPopupForm);



// initialCards.forEach((element) => { createPlace(element.name, element.link) });