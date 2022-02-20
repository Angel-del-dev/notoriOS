export let toolbar = {};

export function linkOpener(app){
    const link = app.getAttribute('data-link');
    const windowConfig = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

    window.open(link, "", windowConfig);
}

export function pdfShow(app) {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf');
    
    const currentLocation = window.location.href;
    const formatedRoute = currentLocation.split('index.html')[0];

    const resource = app.getAttribute("data-link");
    const resourceFullUrl = formatedRoute+"/"+resource;

    if(modal.classList.contains('active')) {
        iframe.src='';        
        modal.classList.remove('active');
        modal.classList.add('no-active');
        return;
    }
    iframe.src = resourceFullUrl;
    modal.setAttribute("data-link", resourceFullUrl);
    modal.classList.remove('no-active');
    modal.classList.add('active');
}

export function addToToolbar(app) {
    const type = app.getAttribute('data-type');
    const keys = Object.keys(toolbar);
    const index = keys.length;

    const currentLocation = window.location.href;
    const formatedRoute = currentLocation.split('index.html')[0];

    const resource = "resources/pdf/cv.pdf";
    const resourceFullUrl = formatedRoute+"/"+resource;

    toolbar[index] = [resourceFullUrl, type];

    createIcons();
}

export function createIcons() {
    const container = document.getElementById("toolbar");
    container.innerHTML = "";
    const keys = Object.keys(toolbar);
    const items = [];

    for(let key of keys) {
        if(!items.includes(toolbar[key][0])) {
            const toolbarItem = document.createElement("div");
            toolbarItem.classList.add("toolbar-item");
            toolbarItem.setAttribute("data-src", toolbar[key][0]);
            
            const img = document.createElement("img");
            img.src = checkType(toolbar[key][1]);
            img.setAttribute('attr', toolbar[key][1]);
        
            toolbarItem.append(img);
            container.append(toolbarItem);
            items.push(toolbar[key][0]);
        }
    }
    // functionalityToolbar();

}

function checkType(type) {
    const currentLocation = window.location.href;
    const formatedRoute = currentLocation.split('index.html')[0];

    const resource = "img/apps_logos/";
    const resourceFullUrl = formatedRoute+"/"+resource;

    switch(type) {
        case 'uenc':
            return resourceFullUrl+"notebook.png";
        // case '';
    }
}

// function functionalityToolbar() {
//     const toolbarItems = document.getElementsByClassName("toolbar-item");
//     for(let item of toolbarItems) {
//         item.addEventListener('click', function(e) {
//             const item = e.target;
//             const toolbarItem = item.closest('.toolbar-item');
//             console.log(toolbarItem);
//             const getModal = document.querySelectorAll(`[data-link] = '${toolbarItem.getAttribute('data-src')}'`);
//             console.log(getModal);
//         });
//     }
// }