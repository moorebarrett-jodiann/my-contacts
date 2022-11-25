'use strict';

/*--------------------------------------------------------------------------- *
 * My Contacts
 * Jodi-Ann Barrett
 * 
 * */

import { select, onEvent } from './utils.js';
import Contact from './Contact.js';

/**--------------------------------- Data ----------------------------------- */
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
    if(Array.isArray(array) && array.length > 0) savedContacts.innerText = contactArray.length;
    savedContacts.innerText = 0;
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
        message.innerHTML = `<p class="valid">Form Submitted</p>`;
        if(contactArray.length < 9) {
            const contact = new Contact(fullName, city, email);
            contact.fullName = fullName;
            contact.city = city;
            contact.email = email;
            contactArray.push(contact);

            updateContactCount(contactArray);
            
            var obj = document.createElement('div');
            obj.innerText = contact.getInfo();
            gridBox.appendChild(obj);
            onEvent('click', obj, () => {
                deleteContact(contact, contactArray);
            });
        
        } else {
            message.innerHTML = `<p>Phone Book is Full!</p>`;
        }

    } catch (error) {
      message.innerHTML = `<p class="invalid">${error}</p>`;
    }
}

function validateFormInput () {
    if(contactInput.value !== '') {
        const contactValues = contactInput.split(', ');
        let message = '';
        let valid = true;
    
        if(contactValues.length < 3) {
            message += 'Full Name, City and Email are required<br/>';
            valid = false;
        }
        
        if(!emailRegex.test(contactValues[2])) {
            message += 'A valid Email is required<br/>';
            valid = false;
        }
        
        if (!valid) {
            message.innerHTML = `<p class="invalid">${message}</p>`;
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
/**-------------------------------------------------------------------------- */