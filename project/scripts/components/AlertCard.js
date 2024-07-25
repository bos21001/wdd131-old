export default function AlertCard(props) {
    const {titles} = props;

    return (
        `<div class="row no-wrap card space-around bg-danger disabled">
            ${titles.map(title => `
                <div>
                    <div class="flow-center" data-bss-hover-animate="pulse">
                        <h2 class="h2 text-bolder">${title.key}</h2>
                        <p class="m-0">${title.value}</p>
                    </div>
                </div>
            `).join('')}
        </div>`
    );
}
