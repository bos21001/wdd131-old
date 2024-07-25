export default function TableResponsive(props) {
    const { headers, rows } = props;

    const tableHeaders = headers.map(header => `<th>${header}</th>`).join('');
    const tableRows = rows.map(row => {
        return (
            `<tr>
                ${row.map(cell => `<td>${cell}</td>`).join('')}
            </tr>`
        );
    }).join('');

    return (
        `<div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        ${tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>`
    );
}