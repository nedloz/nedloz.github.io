export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl
        this.headers = options.headers
        
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
    }

    getCardsinfo() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
    }
    
    sendUserInfo(obj) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(obj)
        })
    }

    sendUserAvatar(obj) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(obj)
        })
    }
    
    sendNewCard(obj) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(obj)
        })
    }

    setLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes `, {
            method: 'PUT',
            headers: this.headers
        })
    }

    removeLike(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes `, {
            method: 'DELETE',
            headers: this.headers
        })
    }
}