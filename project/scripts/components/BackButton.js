function backButtonTemplate() {
    return (
        `<button type="button" class="btn bg-secondary no-border">
            <svg fill="currentColor" height="1em" viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" fill-rule="evenodd"></path>
            </svg>&nbsp;Back
        </button>`
    );
}

export default function BackButton() {
    const div = document.createElement('div');
    div.className = 'mb-3';
    div.innerHTML = backButtonTemplate();

    div.firstChild.addEventListener('click', () => {
        window.history.back();
    });

    return div;
}