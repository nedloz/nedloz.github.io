export default class UserInfo {
    constructor({ name: nameSelector, description: descriptionSelector }) {
        this.namePlace = document.querySelector(nameSelector);
        this.descriptionPlace = document.querySelector(descriptionSelector);
    }
    
    getUserInfo() {
        this.name = this.namePlace.textContent
        this.description = this.descriptionPlace.textContent
        return {
            name: this.name,
            description: this.description
        }
    }

    setUserInfo(data) {
        this.namePlace.textContent = data.name;
        this.descriptionPlace.textContent = data.description;
    }
}