// <div class="table-responsive">
//     <table class="table table-hover">
//         <thead>
//         <tr>
//             <th>Dates</th>
//             <th>Actions</th>
//         </tr>
//         </thead>
//         <tbody>
//         <tr>
//             <td>03/09/2024</td>
//             <td>
//                 <a href="report-listing.html" aria-label="Gera um relatório com todos os erros de uma data específica">
//                     <svg fill="currentColor" height="1em" viewBox="0 0 16 16"
//                          width="1em" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path>
//                         <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
//                     </svg>
//                 </a>
//             </td>
//         </tr>
//         <tr>
//             <td>03/09/2024</td>
//             <td>
//                 <a href="report-listing.html" aria-label="Gera um relatório com todos os erros de uma data específica">
//                     <svg fill="currentColor" height="1em" viewBox="0 0 16 16"
//                          width="1em" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path>
//                         <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
//                     </svg>
//                 </a>
//             </td>
//         </tr>
//         </tbody>
//     </table>
// </div>

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