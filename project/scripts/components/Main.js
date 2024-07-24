export default function Main() {
    const main = document.createElement('main');
    main.className = 'mt-3 mx-1';
    const containerSmall = document.createElement('div');
    containerSmall.className = 'container-small';
    main.appendChild(containerSmall);

    return main;
}