// global variables
const activitiesFieldSet = document.getElementById("activities");
const activitiesCost = document.querySelector("#activities-cost");
const activitiesBox = document.getElementById('activities-box');

// on page load, name field should be in focus

const name = document.getElementById('name'); 
    name.focus();

const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

// other-job-role is hidden by default
otherJobRole.hidden = true;

// need to add an event listener to job field
// if 'other' is selected, make otherJobRole field visible; otherwise, keep hidden
jobRole.addEventListener( 'change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.hidden = false;
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
console.log("totalCost");

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


// if input is valid, add class of 'valid', remove 'invalid'
function passValidation (element ) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('invalid');
    element.parentElement.lastElementChild.style.display = 'none';
};

function failValidation ( element ) {
    element.parentElement.classList.add('invalid'); 
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}
// validate name field

const nameValidator = () => {
    const isValidName = /^[a-zA-z.]+ ?[a-zA-z']* ?[a-zA-z.-]*?$/.test(name.value);
    if (isValidName) {
        passValidation(name);
    } else {
        failValidation(name);
    }
    return isValidName;
}
   
//validate inputted email address
const emailHint = document.getElementById('email-hint');

const emailValidator = () => {
    let isValidEmail;
    if (!email.value) {
        isValidEmail = false;
        emailHint.innerHTML = "Must enter email";
        failValidation(email); 
    } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value) === false) {
        emailHint.innerHTML = "email must be properly formatted";
        isValidEmail = false
        failValidation(email);
    } else {
        passValidation(email);
        isValidEmail = true;
    }
    return isValidEmail;
};


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

//  validate credit card iff cc is selected as form of payment
// validate cc number first

const ccNumValidator = () => {
    const isValidccNum = 	
    /^((4\d{3})|(5[1-5]\d{2})|(6011))-?\d{4}-?\d{4}-?\d{4}|3[4,7]\d{13}$/.test(ccNumber.value);//validates card field
    
    if (isValidccNum) {
        passValidation( ccNumber );
        ccNumber.parentElement.lastElementChild.style.display = 'none';// if valid, hide err hint
    } else {
        failValidation( ccNumber );
        ccNumber.parentElement.lastElementChild.style.display = 'block';//if invalid, show err hint
        }  
    return isValidccNum;
}

// zipcode field
const zipValidator = () => {
    const isValidZip = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode.value); // tests for valid zipcode: 5 or 9 characters
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
    const isValidCvv = /^[0-9]{3,4}$/.test(cvv.value);
    if (isValidCvv) {
        passValidation(cvv);
        cvv.parentElement.lastElementChild.style.display = 'none'; // if valid, hide err hint
        }  else {
            failValidation( cvv );
            cvv.parentElement.lastElementChild.style.display = 'block';// show err hint
        }
        return isValidCvv;
}
// realtime form validator
//validate form in realtime 
name.addEventListener( 'keyup', nameValidator );
email.addEventListener( 'keyup', emailValidator );
activitiesFieldSet.addEventListener( 'change', activityValidator );
ccNumber.addEventListener( 'keyup', ccNumValidator ); 
zipCode.addEventListener( 'keyup', zipValidator);
cvv.addEventListener( 'keyup', cvvValidator );

// need eventlistener to detect when user clicks "register" button

form.addEventListener("submit", (e) => {
    const isValidName = nameValidator();
    const isValidEmail = emailValidator();
    const isValidActivity = activityValidator();
    const isValidccNum = ccNumValidator();
    const isValidZip = zipValidator();
    const isValidCvv = cvvValidator();
 
    // block default and alert user if any of the functions return false
    if (!isValidName || !isValidEmail || !isValidActivity || !isValidccNum || !isValidZip || !isValidCvv) {
        e.preventDefault();
    }


// credit card fields should only be validated if cc is selected payment method

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