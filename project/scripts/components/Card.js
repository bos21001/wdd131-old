export  default function Card(props) {
    const { title, cardBody, subheader, copyButton=false } = props;

    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.innerHTML = `
        <h2 class="h2" contenteditable="true">${title}</h2>
        <h5 class="text-muted h5">${subheader ?? ''}</h5>
    `;

    if (copyButton) {
        cardHeader.appendChild(copyButtonTemplate());
    }

    card.appendChild(cardHeader);

    if (cardBody) {
        const cardBodyElement = document.createElement('div');
        cardBodyElement.classList.add('card-body');
        cardBodyElement.contentEditable = true;
        cardBodyElement.innerHTML = cardBody;
        card.appendChild(cardBodyElement);
    } else {
        // add class all-border-radius to the card header
        cardHeader.classList.add('all-border-radius');
    }

    return card;
}

function copyButtonTemplate() {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.title = 'Copy';
    button.type = 'button';

    button.innerHTML = `
        <svg fill="currentColor" height="1em" viewBox="0 0 16 16" width="1em"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
          fill-rule="evenodd"></path>
        </svg>
    `;

    button.addEventListener('click', () => {
        // copy to clipboard the body of the card content
        const cardBody = button.closest('.card').querySelector('.card-body');
        const range = document.createRange();
        range.selectNode(cardBody);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();

        // show an alert message
        alert('Copied to clipboard');
    });

    return button;
}