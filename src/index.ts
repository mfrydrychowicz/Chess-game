import '/styles/App.scss';

window.addEventListener('load', () => {
    const header = document.createElement('h1');
    header.innerText = 'Chess game web app';

    const body = document.querySelector('body');
    body.appendChild(header);
});