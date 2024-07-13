// url example: http://localhost:63342/wdd131/review.html?product=jj-1969&stars=5&installation-date=2024-07-19&performance=true&written-review=Test&user-name=Christopher

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const product = urlParams.get('product');
const stars = urlParams.get('stars');
const installationDate = urlParams.get('installation-date');
const usefulFeatures = {
    durability: urlParams.get('durability'),
    performance: urlParams.get('performance'),
    easeOfUse: urlParams.get('ease-of-use'),
    design: urlParams.get('design')
};
const writtenReview = urlParams.get('written-review');
const userName = urlParams.get('user-name');

const formSubmissionsCounter = localStorage.getItem('formSubmissionsCounter');

document.getElementById('formSubmissionsCounter').innerText = formSubmissionsCounter;

// Populate the review form
document.getElementById('product').innerText = product;

// Populate the star rating by selecting the input with value equal to the stars URL parameter
document.querySelector(`.star-rating input[value="${stars}"]`).checked = true;

document.getElementById('installation-date').innerText = installationDate;

// Populate the useful features by checking the input with value equal to the URL parameter
Object.keys(usefulFeatures).forEach(function(feature) {
    if (usefulFeatures[feature] === 'true') {
        document.getElementById(feature).checked = true;
    }
});


document.getElementById('written-review').innerText = writtenReview;
document.getElementById('user-name').innerText = userName;

// back button
document.getElementById('backButton').addEventListener('click', function() {
    // back to form.html
    window.location.href = 'form.html';
});