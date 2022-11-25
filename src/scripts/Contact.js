'use strict';

/*--------------------------------------------------------------------------- *
 * My Contacts
 * Jodi-Ann Barrett
 * 
 * */

class Contact {

    #fullName;
    #city;
    #email;

    constructor (fullName, city, email) {
        this.#fullName = fullName;
        this.#city = city;
        this.#email = email;
    }

    set fullName (fullName) {
        if(fullName.length > 0) {
            this.#fullName = fullName;
        } else {
            throw new TypeError('Full Name is not valid');
        }
    }

    get fullName() {
        return this.#fullName;
    }
    
    set city (city) {
        if(city.length > 0) {
            this.#city = city;
        } else {
            throw new TypeError('City is not valid');
        }
    }

    get city() {
        return this.#city;
    }

    set email (email) {
        if(email.length > 0) {
            this.#email = email;
        } else {
            throw new TypeError('Email is not valid');
        }
    }

    get email() {
        return this.#email;
    }
    
    getInfo() {
        return `Full Name: ${this.fullName} <br/>City: ${this.city} <br/>Email: ${this.email} `;
    }
}

export default Contact;
