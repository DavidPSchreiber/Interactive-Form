// global variables
const activitiesFieldSet = document.getElementById("activities");
const activitiesCost = document.querySelector("#activities-cost");

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

