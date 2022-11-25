'use strict';

/*--------------------------------------------------------------------------- *
 * My Contacts
 * Jodi-Ann Barrett
 * 
 * */

import { select, onEvent } from './utils.js';
import Contact from './Contact.js';

/**--------------------------------- Data ----------------------------------- */
const form = select('form');
const add = select('.add-contact');
const gridBox = select('.grid');
const contactInput = select('.contact-input');
const savedContacts = select('.saved-contacts p span');
const message = select('.message');
const contactArray = [];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const max = 12;
/**-------------------------------------------------------------------------- */

/**------------------------- Functions and Events---------------------------- */

// function to update Contact count
function updateContactCount( array ) {
    if(Array.isArray(array)) {
        savedContacts.innerText = `${array.length} / ${max}`;
    }
}  

// function to delete contact cards and rebuild remaining cards
function deleteContact(obj, array) {
    if(Array.isArray(array) && array.length > 0) {        
        // remove selected card for delete
        let objIndex = array.indexOf(obj);  
        array.splice(objIndex, 1);
        const newArr = [...array];
        
        // clear grid
        gridBox.innerHTML = '';

        // refill grid with remaining objects
        newArr.forEach(element => listContacts(element, newArr));

        updateContactCount(newArr);
    }
}  

// function to build contact cards
function listContacts(obj, objArr) {

    var div = document.createElement('div');

    div.classList.add('card');
    div.innerHTML = `
        <p>Name: ${obj.name}</p>
        <p>City: ${obj.city}</p>
        <p>Email: ${obj.email}</p>
    `;
    gridBox.appendChild(div);

    // add on click event for card once created
    onEvent('click', div, () => {
        deleteContact(obj, objArr);
    });
}

// submit form
function submitForm(name, city, email) {

    try {

        message.innerHTML = `<p class="valid">New Contact Created</p>`;
        contactInput.value = '';

        if(contactArray.length < max) {
            // build contact object array
            name = name[0].toUpperCase() + name.slice(1);
            city = city[0].toUpperCase() + city.slice(1);
            const contact = new Contact(name, city, email);
            contactArray.push(contact);
            
            updateContactCount(contactArray);
            listContacts(contact, contactArray);            
        
        } else {
            message.innerHTML = `<p class="warn">Contact List is Full!</p>`;
        }

    } catch (error) {
        message.innerHTML = `<p class="invalid">${error}</p>`;
    }
}

// function to validate form input
function validateFormInput () {

    if(contactInput.value !== '') {
        const contactValues = contactInput.value.split(', ');
        let info = '';
        let valid = true;
    
        if(contactValues.length === 3) {
            // validate email
            if(!emailRegex.test(contactValues[2])) {
                info += 'A valid Email is required';
                valid = false;
            }

        } else {

            info += 'Name, City and Email are required';
            valid = false;

        }
        
        if (!valid) {
            message.innerHTML = `<p class="invalid">${info}</p>`;
        } else {
            // spread contact values in array
            submitForm(...contactValues);
        }

    } else {
        message.innerHTML = `<p class="invalid">Please enter Contact Information</p>`;
    }
}

// validate form when add button is clicked
onEvent('click', add, function (event) {
    event.preventDefault();
    validateFormInput();
});

// when page is reloaded clear grid and form
onEvent('load', window, () => {
    gridBox.innerHTML = '';
    form.reset();
    savedContacts.innerText = `${contactArray.length} / ${max}`;
});

/**-------------------------------------------------------------------------- */