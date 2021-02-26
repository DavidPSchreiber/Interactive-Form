// global variables
const activitiesCost = document.querySelector("#activities-cost");
const activitiesBox = document.getElementById('activities-box');
const getActivities = Array.from(document.querySelectorAll('input[type = checkbox]'));

// on page load, name field should be in focus

const name = document.getElementById('name'); 
    name.focus();

const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

// other-job-role is hidden by default
otherJobRole.hidden = true;

// need to add an event listener to job field
// if 'other' is selected, make otherJobRole field visible; otherwise keep hidden
jobRole.addEventListener( 'change', (e) => {
    if (e.target.value === 'other') {
    // otherJobRole.hidden = false;
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});

// T-SHIRT SECTION

//  user selects t-shirt design
const shirtDesign = document.getElementById('design');
// design then gives select color options depending on the the design selected
const shirtColor = document.getElementById('color');
const colorOptions = shirtColor.children; 
//  color is disabled until design selected
shirtColor.disabled = true;

// add event listener to shirtDesign selector
shirtDesign.addEventListener ( 'change', (e) => {
// once design is chosen, color choice is activated
shirtColor.disabled = false;
// use for-loop to provide color options per design choice
for (let i = 0; i < colorOptions.length; i++) {
    const colorDataTheme = colorOptions[i].getAttribute('data-theme');

// updates available colors based on which t-shirt design selected 

    if ( e.target.value === colorDataTheme ) {
        colorOptions[i].hidden = false;
        colorOptions[i].selected = true;
    } else {
        colorOptions[i].hidden = true;
        colorOptions[i].selected = false;
    }
  }
});

// REGISTER FOR ACTIVITIES SECTION

/* Calculates total cost of activities: 
adds total cost when activity checked; subtracts when checked activity unchecked 
*/
const activitiesFieldSet = document.getElementById("activities");
let selectedActivities = 0;
let totalCost = 0;

activitiesFieldSet.addEventListener("change", (e) => {
    const activity = e.target;
    const activityTime = activity.getAttribute("data-day-and-time");
    const activityCost = parseInt(activity.getAttribute("data-cost"));
    
// use if-else to add or subtract cost from totalCost
    if (activity.checked) {
        totalCost += activityCost;
        selectedActivities++;
    } else {
        totalCost -= activityCost;
        selectedActivities--;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;


// check activities schedule to ensure no time conflict in chosen activities
const activityCheckboxes = document.querySelectorAll('#activities input');
    for (let i = 0; i < activityCheckboxes.length; i++) {
        const eventTime = activityCheckboxes[i].getAttribute("data-day-and-time");
        if (eventTime === activityTime && activity !== activityCheckboxes[i])
        {
            if (activity.checked) {
                activityCheckboxes[i].disabled = true;
                activityCheckboxes[i].parentElement.classList.add("disabled");
            }  else {
                activityCheckboxes[i].disabled = false;
                activityCheckboxes[i].parentElement.classList.remove("disabled");
            }
        }
    }
});

// improve accessibility for activities section

getActivities.forEach(box => {
    box.addEventListener('focus', e => {
        e.target.parentNode.classList.add("focus");
    });
    box.addEventListener('blur', e => {
        e.target.parentNode.classList.remove("focus");
    });
});


// PAYMENT INFORMATION SECTION
// user selects method of payment
const selectPayment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const bitCoin = document.getElementById("bitcoin");
const payPal = document.getElementById("paypal");
const zipCode = document.getElementById('zip');

/* Most common method of payment should be creditcard; 
Bitcoin might argue the point, but let's 
hide bitcoin and paypal by default */
bitCoin.hidden = true;
payPal.hidden = true;
payment.children[1].selected = true;

// add event listener for payment type selected
selectPayment.addEventListener( 'change', (e) => {
// if value selected matches id of payment type, show the corresponding div; if not, hide
if ( e.target.value === 'credit-card') {
    payPal.hidden = true;
    bitCoin.hidden = true;
    creditCard.hidden = false;
} else if (e.target.value === 'bitcoin') {
    creditCard.hidden = true;
    payPal.hidden = true;
    bitCoin.hidden = false;
} else if ( e.target.value === 'paypal') {
    bitCoin.hidden = true;
    creditCard.hidden = true;
    payPal.hidden = false;
    }
});

//  VALIDATE ALL RELEVANT FORM SECTIONS

// Helper function to show user any and all validation errors
const form = document.querySelector('form');
const email = document.getElementById('email');
const ccNumber = document.getElementById('cc-num');
const cvv = document.getElementById('cvv');


// if input is valid, add class of 'valid', remove 'not-valid'
function passValidation (element ) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
};

function failValidation ( element ) {
    element.parentElement.classList.add('not-valid'); 
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}
// validate name field

const nameValidator = () => {
    const isValidName = /^[a-zA-z.]+ ?[a-zA-z']* ?[a-zA-z.-]*?$/.test(name.value); //validates name input
        if ( isValidName ) {
        passValidation( name );
        name.parentElement.lastElementChild.style.display = 'none'; // if valid, hide err msg
        name.parentElement.children[2].style.display = 'none'; // if valid, hide 2nd err msg
    } else {
        failValidation( name );
        if (name.value === '') {
            name.parentElement.children[2].style.display = 'block';// show msg prohibiting special characters and numbers
            name.parentElement.lastElementChild.style.display = 'none'; // hide first err msg
            } else {
            name.parentElement.lastElementChild.style.display = 'block'; //if empty, show err msg
            name.parentElement.children[2].style.display = 'none'; // hide 2nd err msg    
        }
    }
        return isValidName;
    }
 
//validate inputted email address

const emailHint = document.getElementById('email-hint');

const emailValidator = () => {
    const isValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value); //validates inputted email
    if ( isValidEmail ) {
        passValidation( email );
        email.parentElement.lastElementChild.style.display = 'none';
// if valid, hide err hint
        email.parentElement.children[2].style.display = 'none'; 
// if valid, hide second err hint
    } else {
        failValidation( email );
        if ( email.value === '') {
            email.parentElement.lastElementChild.style.display = 'block';
            // above shows err hint if field left empty
            email.parentElement.children[2].style.display = 'none'; // hide 2nd err hint
        } else {
            email.parentElement.children[2].style.display = 'block'; //show err hint if not formatted properly
            email.parentElement.lastElementChild.style.display = 'none'; // hide initial err hint
        } 
    }
    return isValidEmail;
}

// Validate activities field

const activityValidator = () => {
    const isValidActivity = selectedActivities > 0;
    if (isValidActivity) {
        passValidation(activitiesBox);
    } else {
        failValidation(activitiesBox);
    }
    return isValidActivity;
};

// validate credit card iff cc is selected as form of payment
// validate cc number first

const ccNumValidator = () => {
    const isValidccNum = 	
    /^\b\d{13,16}\b$/.test(ccNumber.value) //validates card field
    
    if (isValidccNum) {
        passValidation( ccNumber );
        ccNumber.parentElement.lastElementChild.style.display = 'none';// if valid, hide err hint
    } else {
        failValidation( ccNumber );
        ccNumber.parentElement.lastElementChild.style.display = 'block';//if not-valid, show err hint
        }  
    return isValidccNum;
}

// zipcode field
const zipValidator = () => {
    const isValidZip = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode.value); // tests for valid zipcode: 5 characters
    if ( isValidZip ) {
        passValidation( zipCode );
        zipCode.parentElement.lastElementChild.style.display = 'none';// if valid, hide err hint
    } else {
        failValidation( zipCode );
        zipCode.parentElement.lastElementChild.style.display = 'block'; // show err hint
    }
    return isValidZip;
}

// cvv field
const cvvValidator = () => {
    const isValidCvv = /^\d{3}$/.test(cvv.value);
    if (isValidCvv) {
        passValidation(cvv);
        cvv.parentElement.lastElementChild.style.display = 'none'; // if valid, hide err hint
        }  else {
            failValidation( cvv );
            cvv.parentElement.lastElementChild.style.display = 'block';// show err hint
        }
        return isValidCvv;
}

//validate form in realtime 
name.addEventListener( 'keyup', nameValidator );
email.addEventListener( 'keyup', emailValidator );
activitiesFieldSet.addEventListener( 'change', activityValidator );
ccNumber.addEventListener( 'keyup', ccNumValidator ); 
zipCode.addEventListener( 'keyup', zipValidator);
cvv.addEventListener( 'keyup', cvvValidator );

const submitForm = document.querySelector('form');

form.addEventListener( "submit", (e) => {
   
    if ( !nameValidator() ) {
        e.preventDefault();
    }
    if ( !emailValidator() ) {
        e.preventDefault();
    }
    if ( !activityValidator() ) {
        e.preventDefault();
    }

// validate cc info iff it's the selected payment method
    if ( payment.children[1].selected === true ) {
        if ( !ccNumValidator() ) {
            e.preventDefault();
        }
        if ( !zipValidator() ) {
            e.preventDefault();
        }
        if ( !cvvValidator() ) {
            e.preventDefault();
        }
      }
    });

// END OF CODE