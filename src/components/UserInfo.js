export default class UserInfo {
    constructor({ name: nameSelector, description: descriptionSelector, image: imageSelector }) {
        this.namePlace = document.querySelector(nameSelector);
        this.descriptionPlace = document.querySelector(descriptionSelector);
        this.imagePlace = document.querySelector(imageSelector)
    }
    
    getUserInfo() {
        this.name = this.namePlace.textContent
        this.about = this.descriptionPlace.textContent
        return {
            name: this.name,
            about: this.about
        }
    }

    setUserInfo(data) {
        this.namePlace.textContent = data.name;
        this.descriptionPlace.textContent = data.about;
    }
    
    setUserImage(imageSrc) {
        this.imagePlace.style.backgroundImage = `url(${imageSrc})`
    }
}