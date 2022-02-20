import { linkOpener, pdfShow, createIcons } from './functions.js';
import { toolbar } from './functions.js';
import { addToToolbar } from './functions.js';

const apps = document.getElementsByClassName("app");

alert("This website is currently being developed and its in a very early state");

// Event listeners

for(let app of apps) {
    app.addEventListener('dblclick', function(e) {
        const appSelected = e.target;

        if(appSelected.classList.contains('app')) {
            const appType = appSelected.getAttribute('data-type');
            checkType(appSelected, appType);
            return;
        }

        const closest = appSelected.closest('.app');
        checkType(closest, closest.getAttribute("data-type"));

    });
}

// Functions

function checkType(app, type) {
    switch (type) {
        case 'link':
            linkOpener(app);
            return;
            break;
        case 'uenc':
            pdfShow(app);
            break;
        case 'arch':
            break;
    }
    addToToolbar(app);
    
}

const closeModal = document.getElementById("close-modal");

closeModal.addEventListener("click", function(e) {
    const modal = e.target.closest('#pdf-modal');
    
    const src = modal.children[1].children[0].src;
    const keys = Object.keys(toolbar);
    for(let key of keys) {
        if(toolbar[key][0] == src) {
            delete toolbar[key];
        }
    }
    createIcons();
    if(modal.classList.contains('active')) {
        modal.classList.remove('active');
        modal.classList.add('no-active');
        return;
    }
    modal.classList.remove('no-active');
    modal.classList.add('active');
});
