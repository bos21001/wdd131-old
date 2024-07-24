export  default function Card(props) {
    const { title, cardBody } = props;

    return (
       ` <div class="card">
            <div class="card-header">
                <h2 class="h2">${title}</h2>
            </div>
            <div class="card-body">
                ${cardBody}
            </div>
        </div>`
    );
}