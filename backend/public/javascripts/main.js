let mainDivEl;

function start() {
    const pEl = document.createElement('p');
    pEl.textContent = 'Server';
    mainDivEl.appendChild(pEl);
}

function onLoad() {
    mainDivEl = document.getElementById('main');
    start();
}

document.addEventListener('DOMContentLoaded', onLoad);