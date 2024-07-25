export  default function Card(props) {
    const { title, cardBody, subheader } = props;

    return (
       ` <div class="card">
            <div class="card-header">
                <h2 class="h2">${title}</h2>
                <h5 class="text-muted h5">${subheader ?? ''}</h5>
            </div>
            <div class="card-body">
                ${cardBody}
            </div>
        </div>`
    );
}