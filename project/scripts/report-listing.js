import TableResponsive from './components/TableResponsive.js';
import Card from './components/Card.js';
import BackButton from './components/BackButton.js';
import NavBar from './components/NavBar.js';
import Main from './components/Main.js';
import AlertCard from "./components/AlertCard.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const query = urlParams.get('query');

async function fetchListingDateData(id, query) {
    if (id === 'dates') {
        // Remove the "/" from query
        const date = query.replace(/\//g, '');

        try {
            // Get the .json file named "listing_date_<date>.json"
            const response = await fetch(`scripts/listing_date_${date}.json`);
            return await response.json();
        } catch (err) {
            console.error(err);
            return err;
        }
    } else if (id === 'clients' || id === 'campaigns_id' || id === 'similar_errors') {
        try {
            const listingDatesResponse = await fetch('scripts/listing_dates.json');
            const listingDates = await listingDatesResponse.json();

            let listingDatesData = listingDates.map(async date => {
                const formatedDate = date.replace(/\//g, '');
                return await fetchListingDateData('dates', formatedDate);
            });

            listingDatesData = await Promise.all(listingDatesData);

            listingDatesData = listingDatesData.reduce((acc, val) => {
                acc.total_erros += val.total_erros;
                acc.contagem_metodos = {...acc.contagem_metodos, ...val.contagem_metodos};
                acc.contagem_crms = {...acc.contagem_crms, ...val.contagem_crms};
                acc.contagem_erros_similares = {...acc.contagem_erros_similares, ...val.contagem_erros_similares};
                acc.dados = [...acc.dados, ...val.dados];
                return acc;
            });

            if (id === 'clients') {
                listingDatesData.dados = listingDatesData.dados.filter(item => item.crm === query);
                // keep only the actual query as the contagem_crms
                listingDatesData.contagem_crms = {
                    [query]: listingDatesData.contagem_crms[query]
                };
            } else if (id === 'campaigns_id') {
                listingDatesData.dados = listingDatesData.dados.filter(item => item.fila === query);
            } else if (id === 'similar_errors') {
                listingDatesData.dados = listingDatesData.dados.filter(item => item.mensagem === query);
                // keep only the actual query as the contagem_erros_similares
                listingDatesData.contagem_erros_similares = {
                    [query]: listingDatesData.contagem_erros_similares[query]
                };
            } else {
                throw new Error('Invalid id');
            }

            // recount the total errors, contagem_metodos, contagem_crms and contagem_erros_similares
            listingDatesData.total_erros = listingDatesData.dados.length;

            let methods = {};
            let clients = {};
            let similarErrors = {};

            for (let item of listingDatesData.dados) {
                methods[item.metodo] = methods[item.metodo] ? methods[item.metodo] + 1 : 1;
                clients[item.crm] = clients[item.crm] ? clients[item.crm] + 1 : 1;
                similarErrors[item.mensagem] = similarErrors[item.mensagem] ? similarErrors[item.mensagem] + 1 : 1;
            }

            listingDatesData.contagem_metodos = methods;
            listingDatesData.contagem_crms = clients;
            listingDatesData.contagem_erros_similares = similarErrors;

            return listingDatesData;
        } catch (err) {
            console.error(err);
            return err;
        }
    }
}

function createElementWithContent(tag, content, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.innerHTML = content;
    return element;
}

function renderCardTableDetailedData(header, renderTo, data) {
    const headers = ['View', 'Message', 'Date', 'Client', 'Campaign', 'Call ID'];

    const rows = data.map(item => {
        let message = item.mensagem;
        let date = item.data;
        let client = item.crm;
        let campaign = item.fila;
        let callid = item.callid;

        let view = `<a href="report.html?callid=${callid}" aria-label="Gera um relatório com todos os erros de uma data específica">
            <svg fill="currentColor" height="1em" viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
            </svg>
        </a>`;

        return [view, message, date, client, campaign, callid];
    });

    const table = TableResponsive({headers, rows});
    const card = Card({title: header, cardBody: table});

    renderTo.appendChild(card);
}

function renderCardTable(header, renderTo, data, headers, subheader=null) {
    const rows = Object.entries(data).map(([key, value]) => [key, value]);

    const table = TableResponsive({headers, rows});

    return Card({title: header, cardBody: table, subheader: subheader});
}

function removeLoader() {
    const loader = document.querySelector('#loading');
    setTimeout(() => {
        loader.remove();
    }, 1500);
}

function renderBackButton() {
    const containerSmall = document.querySelector('.container-small');
    const backButton = BackButton();
    containerSmall.appendChild(backButton);
}

function getFormattedDate() {
    const now = new Date();

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);

    // The default format from Intl.DateTimeFormat is "MM/DD/YYYY, hh:mm AM/PM"
    // We need to modify it to "MM/DD/YYYY at hh:mm AM/PM"

    // Replacing the comma and space with " at "
    return formattedDate.replace(',', ' at');
}

await fetchListingDateData(id, query).then(data => {
    const body = document.querySelector('body');
    body.appendChild(NavBar());
    body.appendChild(Main());
    renderBackButton();

    const containerSmall = body.querySelector('main .container-small');

    const article = `
        <article class="text-align-left">
            <p>This report was automatically generated by the system. The data presented here refer to the Log_Dev.log file read on ${getFormattedDate()}.</p>
            <p>A total of ${data.total_erros} errors were found.</p>
            <p>Note: The data presented may be incorrect as they depend on the correct formatting of the Log_Dev.log file.</p>
        </article>
    `;

    const methods = data.contagem_metodos;
    const clients = data.contagem_crms;
    // round to the nearest integer
    const averageClientErrors =  Math.round(Object.values(clients).reduce((acc, val) => acc + val, 0) / Object.keys(clients).length);

    const similarErrors = data.contagem_erros_similares;
    const detailedData = data.dados

    console.log(data);

    const card = Card({title: 'Error Report Grouped By Date', cardBody: article, subheader: 'Generated on 09/03/2024 at 11:53'});
    const alertCard = AlertCard({titles: [
            {key: data.total_erros, value: 'Total Errors'},
            {key: Object.keys(clients).length, value: 'Clients with Errors'},
            {key: averageClientErrors, value: 'Average Client Errors'},
            {key: Object.keys(similarErrors).length, value: 'Type of Errors'}
        ]}
    );

    const methodsCard = renderCardTable('Methods', containerSmall, methods, ['Method', 'Count'], 'Count by method grouping');
    const clientsCard = renderCardTable('Clients', containerSmall, clients, ['Client', 'Count'], 'Count by client grouping');
    const similarErrorsCard = renderCardTable('Similar Errors', containerSmall, similarErrors, ['Error', 'Count'], 'Count by error grouping');

    containerSmall.appendChild(card);

    containerSmall.appendChild(createElementWithContent('div', alertCard, 'centered-div'));

    const row = createElementWithContent('div', '', 'row');
    row.appendChild(methodsCard);
    row.appendChild(clientsCard);
    containerSmall.appendChild(row);

    containerSmall.appendChild(similarErrorsCard);
    renderCardTableDetailedData('Detailed Data', containerSmall, detailedData);

    removeLoader();
}).catch(err => {
    console.error(err);
    removeLoader();
});