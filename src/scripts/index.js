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
/**-------------------------------------------------------------------------- */

/**------------------------- Functions and Events---------------------------- */

// function to update Contact count
function updateContactCount( array ) {
    if(Array.isArray(array) && array.length > 0) {
        console.log(array);
        console.log(array.length);
        console.log(savedContacts);
        savedContacts.innerText = `${array.length}`;
    }
}  

// function to delete contact from gridbox
function deleteContact(obj, array) {
    if(Array.isArray(array) && array.length > 0) {
        // save copy of original array
        const originalArr = [...array];
        
    }
}  

function submitForm(fullName, city, email) {
    try {
        message.innerHTML = `<p class="valid">New Contact Created</p>`;
        if(contactArray.length < 9) {
            const contact = new Contact();
            contact.fullName = fullName;
            contact.city = city;
            contact.email = email;
            contactArray.push(contact);
            console.log(contact);
            console.log(contactArray);
            updateContactCount(contactArray);
            
            var obj = document.createElement('div');
            obj.classList.add('card');
            obj.innerText = `
                Full Name: ${contact.fullName}<br/>
                City: ${contact.city}<br/>
                Email: ${contact.email}
            `;
            gridBox.appendChild(obj);
            // onEvent('click', obj, () => {
            //     deleteContact(contact, contactArray);
            // });
        
        } else {
            message.innerHTML = `<p>Phone Book is Full!</p>`;
        }

    } catch (error) {
        console.log(error);
        message.innerHTML = `<p class="invalid">${error}</p>`;
    }
}

function validateFormInput () {
    if(contactInput.value !== '') {
        const contactValues = contactInput.value.split(', ');
        let info = '';
        let valid = true;
    
        if(contactValues.length === 3) {
            if(!emailRegex.test(contactValues[2])) {
                info += 'A valid Email is required<br/>';
                valid = false;
            }
        } else {
            info += 'Full Name, City and Email are required<br/>';
            valid = false;
        }
        
        if (!valid) {
            message.innerHTML = `<p class="invalid">${info}</p>`;
            contactInput.value = '';
        } else {
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
  });
/**-------------------------------------------------------------------------- */