export default function NavBar() {
    const navBar = document.createElement('nav');
    navBar.className = 'navbar shadow';
    navBar.innerHTML = `
            <div class="d-flex justify-content-between">
                <a href="index.html" class="logo-link">
                    <img alt="ExpertVoice Log logo" src="images/expertlog_logo.png" class="logo-img">
                </a>
                <button class="btn bg-white dark-font no-border" id="nav-bar-toggler" aria-label="Menu" type="button">
                    <svg class="bi bi-list" fill="currentColor" height="2em" viewBox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" fill-rule="evenodd"/>
                    </svg>
                </button>
                <div class="navbar-collapse collapse">
                    <ul class="navbar-nav">
                        <li><a href="listing.html?id=dates" id="dates" class="nav-link" aria-label="Date">Dates</a></li>
                        <li><a href="listing.html?id=clients" id="clients" class="nav-link" aria-label="Clients">Clients</a></li>
                        <li><a href="listing.html?id=campaigns_id" id="campaigns_id" class="nav-link" aria-label="Campaigns ID">Campaigns ID</a></li>
                        <li><a href="listing.html?id=similar_errors" id="similar_errors" class="nav-link" aria-label="Similar Errors">Similar Errors</a></li>
                    </ul>
                    <div>
                        <svg height="1em" viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"></path>
                        </svg>
                    </div>
                </div>
            </div>`;

    const navBarToggle = navBar.querySelector('#nav-bar-toggler');

    navBarToggle.addEventListener('click', () => {
        const collapse = document.querySelector('.collapse');
        collapse.className = collapse.className.includes('show') ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    });

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        const element = document.getElementById(id);
        if (element) {
            element.className = element.className + ' active';
        }
    }

    return navBar;
}