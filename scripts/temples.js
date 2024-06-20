// Store the selected elements that we are going to use.
const mainnav = document.querySelector('nav')
const hambutton = document.querySelector('#menu');

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

// get actual page and change the class of the link to active
let actualPage = window.location.href;

if (actualPage.includes("temples")) {
    document.querySelector("#home-nav-link").classList.add("active");
} else if (actualPage.includes("old")) {
    document.querySelector("#old-nav-link").classList.add("active");
} else if (actualPage.includes("new")) {
    document.querySelector("#new-nav-link").classList.add("active");
} else if (actualPage.includes("large")) {
    document.querySelector("#large-nav-link").classList.add("active");
} else if (actualPage.includes("small")) {
    document.querySelector("#small-nav-link").classList.add("active");
}