const navBarToggle = document.querySelector('#nav-bar-toggler');

navBarToggle.addEventListener('click', () => {
    const collapse = document.querySelector('.collapse');
    collapse.className = collapse.className.includes('show') ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
});