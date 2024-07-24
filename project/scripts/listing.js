import TableResponsive from './components/TableResponsive.js';
import Card from './components/Card.js';
import BackButton from './components/BackButton.js';
import NavBar from './components/NavBar.js';
import Main from './components/Main.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const listings = {
    dates: 'listing_dates.json',
    clients: 'listing_clients.json',
    campaigns_id: 'listing_campaigns_id.json',
    similar_errors: 'listing_similar_errors.json',
};

const headersMap = {
    dates: 'Available Dates',
    clients: 'Available Clients',
    campaigns_id: 'Available Campaigns',
    similar_errors: 'Similar Errors',
};

function createElementWithContent(tag, content, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.innerHTML = content;
    return element;
}

function removeLoader() {
    const loader = document.querySelector('#loading');
    setTimeout(() => {
        loader.remove();
    }, 1500);
}

function renderCardTable(id, header, renderTo) {
    fetch(`scripts/${listings[id]}`)
        .then(response => response.json())
        .then(data => {
            const headers = [header, 'View'];
            const rows = data.map(query => [
                query,
                `<a href="report-listing.html?id=dates&query=${query}" aria-label="Gera um relatório com todos os erros de uma data específica">
                    <svg fill="currentColor" height="1em" viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
                    </svg>
                </a>`
            ]);

            const table = TableResponsive({ headers, rows });
            const card = Card({ title: header, cardBody: table });

            renderTo.appendChild(createElementWithContent('div', card, 'centered-div'));
            removeLoader();
        });
}

function renderBackButton() {
    const containerSmall = document.querySelector('.container-small');
    const backButton = BackButton();
    containerSmall.appendChild(backButton);
}

addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    body.appendChild(NavBar());
    body.appendChild(Main());
    renderBackButton();

    const containerSmall = body.querySelector('main .container-small');

    if (listings[id]) {
        renderCardTable(id, headersMap[id], containerSmall);
    } else {
        removeLoader();
    }
});
