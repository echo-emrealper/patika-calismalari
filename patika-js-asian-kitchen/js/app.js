// import "menu" from another js files
import { menu } from "./menu.js";

//dom variables
const btnSection = document.querySelector('.btn-container');
const menuSection = document.querySelector('.section-center');
const foodList = [...new Set(menu.map(item => item.category))];

//main function call
starter(window, foodList, btnSection);

//main function
function starter(loader, items, listener) {
    //page start event
    loader.addEventListener('load', createMenu(menu));
    
    //items list to create buttons
    items.sort((a, b) => a.localeCompare(b));
    items.unshift('All');
    items.map(item => listener.appendChild(createButton(item)));

    //button listeners
    listener.childNodes.forEach(item => item.addEventListener('click', filterMenu));
}

//to create menu
function createMenu(items) {
    items.forEach(item => menuSection.innerHTML += createMenuItem(item))
};

//to create menu items --> call by CreateMenu for foodList
function createMenuItem(item) {
    let menuItem = `<div class = "menu-items col-lg-6 col-sm-12">
                    <img src=${item.img} alt= ${item.title} class = "photo">
                    <div class = "menu-info">
                        <div class = "menu-title">
                            <h4>${item.title}</h4>
                            <h4 class="price">${item.price}</h4>
                        </div>
                        <div class="menu-text">${item.desc}</div>
                    </div>
                </div>`
    return menuItem;
}

//to create buttons for foodList
function createButton(category) {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-item', 'btn-outline-dark');
    btn.id = category;
    btn.textContent = category;
    return btn;
}

//to filter menu
function filterMenu(el) {
    menuSection.innerHTML = '';
    menu.filter(item => {
        if (el.target.id === 'All') {
            menuSection.innerHTML += createMenuItem(item)
        } else if ((el.target.id === item.category)) {
            menuSection.innerHTML += createMenuItem(item);
        }
    })
}
