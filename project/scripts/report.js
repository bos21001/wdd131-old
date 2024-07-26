import NavBar from "./components/NavBar.js";
import Main from "./components/Main.js";
import BackButton from "./components/BackButton.js";
import Card from "./components/Card.js";
import TableResponsive from "./components/TableResponsive.js";

const urlParams = new URLSearchParams(window.location.search);
const callid = urlParams.get('callid');

async function fetchReportData(callid) {
    try {
        const response = await fetch(`scripts/${callid}.json`);
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
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

function renderCardTable(header, renderTo, data, headers, subheader=null) {
    const rows = Object.entries(data).map(([key, value]) => [key, value]);

    const table = TableResponsive({headers, rows});

    return Card({title: header, cardBody: table, subheader: subheader});
}
await fetchReportData(callid).then(data => {
    console.log(data);
    const body = document.querySelector('body');
    body.appendChild(NavBar());
    body.appendChild(Main());
    renderBackButton();

    const containerSmall = body.querySelector('main .container-small');

    const article = `
        <article class="text-align-left">
            <p>Callid: ${callid}</p>
            <p>Note: The data presented may be incorrect as they depend on the correct formatting of the Log_Dev.log file.</p>
        </article>
    `;

    const errorData = data?.errorData;
    const hr = document.createElement('hr');

    const requestAndResponseData = [];

    for (const [method, {requestData, responseData}] of Object.entries(data.apiClientRequestsAndResponsesByMethod)) {
        const section = document.createElement('section');
        section.classList.add('text-align-left');

        if (requestData) {
            const requestTitle = document.createElement('h4');
            requestTitle.textContent = 'Request Data';

            const requestCode = document.createElement('code');
            // add beautified JSON to the code element
            requestCode.textContent = JSON.stringify(requestData, null, 4);

            section.appendChild(requestTitle);
            section.appendChild(requestCode);
        }

        if (responseData) {
            const responseTitle = document.createElement('h4');
            responseTitle.textContent = 'Response Data';

            const responseCode = document.createElement('code');
            responseCode.textContent = JSON.stringify(responseData, null, 2);

            const hrResponse = document.createElement('hr');

            section.appendChild(hrResponse);
            section.appendChild(responseTitle);
            section.appendChild(responseCode);
        }

        requestAndResponseData.push(Card({title: method, cardBody: section.outerHTML, copyButton: true}));
    }

    const logCode = `<div class="text-align-left"><code>${data.data.asArray.join("<br>")}</code></div>`;

    const card = Card({title: 'Search Result', cardBody: article, subheader: `Generated on ${getFormattedDate()}`});

    const errorCard = renderCardTable('Errors', containerSmall, errorData, ['Parameters', 'Content'], 'Errors found for call ID');
    const requestAndResponseCard = Card({title: 'Request and Response', subheader: 'API Requests and Responses during the call'});
    const logDataCard = Card({title: `${callid}.log`, cardBody: logCode, copyButton: true});

    containerSmall.appendChild(card);
    if (errorData.mensagem) {
        containerSmall.appendChild(errorCard);
    }
    containerSmall.appendChild(hr);
    containerSmall.appendChild(requestAndResponseCard);
    requestAndResponseData.forEach(card => containerSmall.appendChild(card));
    containerSmall.appendChild(hr);
    containerSmall.appendChild(logDataCard);

});