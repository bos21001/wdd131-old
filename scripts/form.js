const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        avgRating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        avgRating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        avgRating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        avgRating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        avgRating: 5.0
    }
];

// populate product select options
const productSelect = document.getElementById('product');
products.forEach(function(product) {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
});

// Styling for star rating on touch devices
document.querySelectorAll('.star-rating label').forEach(function(label) {
    label.addEventListener('touchstart', function() {
        label.classList.add('hover');
    });

    label.addEventListener('touchend', function() {
        setTimeout(function() {
            label.classList.remove('hover');
        }, 200);
    });

    label.addEventListener('touchcancel', function() {
        setTimeout(function() {
            label.classList.remove('hover');
        }, 500);
    });
});

// add a localStorage variable to count form submissions
if (!localStorage.getItem('formSubmissionsCounter')) {
    localStorage.setItem('formSubmissionsCounter', 0);
}

const form = document.getElementById('product-review-form');
form.addEventListener('submit', function() {
    // increment form submissions counter
    let counter = localStorage.getItem('formSubmissionsCounter');
    counter++;
    localStorage.setItem('formSubmissionsCounter', counter);
});