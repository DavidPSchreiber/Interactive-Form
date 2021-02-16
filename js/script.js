
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
const activityRegister = () => {
    const activities = document.getElementById('activities');
    const activitiesTotal = document.getElementById('activities-cost')
    let totalCost = 0;
// add event listener to recognize addition/subtraction of activities
    activities.addEventListener ('change', e => {
// convert cost from string to number with parseInt
    if (e.target.checked) {
        totalCost += parseInt(e.target.attributes['data-cost'].value);
    } else {
        totalCost -= parseInt(e.target.attributes['data-cost'].value);
    }
    activitiesTotal.textContent = `Total: $${totalCost}`
    });
}

