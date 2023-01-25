
export default class Card {
    constructor(data, userID, templateSelector, handleCardClick, handleTrashClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._ownerID = data.owner._id

        this.userID = userID

        this._cardId = data._id
        this._likes = data.likes
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick
        this.handleLikeClick = handleLikeClick
        this.handleTrashClick = handleTrashClick
        this._handleTrashClick = this._handleTrashClick.bind(this)
        this._handleLikeClick = this._handleLikeClick.bind(this)
        this._toggleLike = this._toggleLike.bind(this)
        this._handleImageClick = this._handleImageClick.bind(this)
        
    }

    _getUsersWhoLikeId() {
        const peopleWhoLike = []
        this._likes.forEach(person => {
            peopleWhoLike.push(person._id)
        });
        return peopleWhoLike
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        return cardElement
    }
 
    _getImage() {
        this._image = this._element.querySelector('.place__image');
        this._image.src = this._link;
        this._image.alt = this._name;
    }

    _getLikes(likes) {
        this.likeCount = this._element.querySelector('.place__like-count')
        this.likeCount.textContent = likes.length
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('place__like-button_active')
    }


    _handleImageClick() {
        this.handleCardClick(this._link, this._name)
    }

    _handleTrashClick() {
        this.handleTrashClick(this._cardId)
        
    }

    _handleLikeClick(evt) {
        if (evt.currentTarget.classList.contains('place__like-button_active')) {
            this.handleLikeClick(false, this._cardId)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } 
                    return Promise.reject(`Ошибка: ${res.status}`); 
                })
                .then(res => {this._getLikes(res.likes)})
                .catch(err => console.log(err))
        } else {
            this.handleLikeClick(true, this._cardId)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`); 
                })
                .then(res => {this._getLikes(res.likes)})
                .catch(err => console.log(err))
        }
        this._toggleLike(evt)
    }

    _showMylike(){
        const likes = this._getUsersWhoLikeId()
        if (likes.includes(this.userID)) {
            this._like.classList.add('place__like-button_active')
        }
    }

    _showTrash() {
        if (this.userID == this._ownerID) {
            this._trash.style.display = "block"
        }
    }

    _setEventListeners() {
        this._like = this._element.querySelector('.place__like-button');
        // console.log(this._element.querySelector('.place__trash'))
        this._trash = this._element.querySelector('.place__trash');
        this._like.addEventListener('click', this._handleLikeClick );
        this._image.addEventListener('click', this._handleImageClick );
        this._trash.addEventListener('click', this._handleTrashClick );
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._getImage();
        this._setEventListeners();
        this._getLikes(this._likes)
        this._showTrash()
        this._showMylike()
        this._element.querySelector('.place__name').textContent = this._name;
        
        return this._element
    }
}