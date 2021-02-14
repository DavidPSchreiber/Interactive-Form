
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
const tShirtDesign = document.getElementById('design');

// design then gives select color options depending on the the design selected
const tShirtColor = document.getElementById('color');
const colorOptions = tShirtColor.children; 

//  color is disabled until design selected
tShirtColor.disabled = true;

// add event listener to tShirtDesign selector
tShirtDesign.addEventListener ( 'change', (e) => {

// once design is chosen, color choice is activated
tShirtColor.disabled = false;

// use for-loop to provide color options per design choice
for (let i = 0; i < colorOptions.length; i++) {
    if (e.target.value === 'js puns') {
        color
    }

}

})
