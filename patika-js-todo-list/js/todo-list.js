//SELECTORS, VARIABLES
const containerDOM = document.querySelector('.container');
const addButtonDOM = document.querySelector("#liveToastBtn")
const ulDOM = document.createElement('ul');
const textInput = document.querySelector('#task')
let items = getLocalStorage() ? getLocalStorage() : [];
let counter = localStorage.getItem('counter') ? localStorage.getItem('counter') : 0;
ulDOM.id = "list"
containerDOM.appendChild(ulDOM);
items ? items.forEach(localStorageInitialize) :[];

//EVENTS
addButtonDOM.addEventListener('click', addElement);
ulDOM.addEventListener('click', checkElement);
ulDOM.addEventListener('click', removeElement);

//FUNCTIONS
function addElement(event) {
    // TO ADD LIST ITEM
    if (textInput.value.trim()) {
        const liDOM = document.createElement('li');
        const spanDOM = document.createElement('span');
        const item = { itemID: `li-${counter}`, item: textInput.value.trim(), isChecked: false }
        liDOM.id = `li-${counter}`;
        liDOM.innerHTML = textInput.value.trim();
        ulDOM.appendChild(liDOM);
        spanDOM.classList.add('close');
        spanDOM.innerHTML = "x"
        liDOM.appendChild(spanDOM);
        items.push(item)
        counter++;
        $(".success").toast("show")

    } else {
        $(".error").toast("show")
    }
    localStorage.setItem('counter', counter);
    setLocalStorage(items)
    textInput.value = "";
}

function checkElement(event) {
    // TO CHECK LIST ITEM
    if (event.target.tagName === 'LI') {
        getLocalStorage();
        const getID = event.target.id;
        const getIndex = items.findIndex(item => item.itemID === getID);
        event.target.classList.toggle('checked');
        event.target.className === 'checked' ? items[getIndex].isChecked = true : items[getIndex].isChecked = false;
        setLocalStorage(items)
    }
}

function removeElement(event) {
    // TO REMOVE LIST ITEM
    if (event.target.tagName === 'SPAN') {
        getLocalStorage();
        const getID = event.target.parentElement.id;
        const getIndex = items.findIndex(item => item.itemID === getID);
        event.target.parentElement.remove();
        items.splice(getIndex, 1);
        setLocalStorage(items);
    }
}

function localStorageInitialize(items) {
    //TO INITIALIZE LOCAL STORAGE ITEMS
    const liDOM = document.createElement('li');
    const spanDOM = document.createElement('span');
    liDOM.id = items.itemID;
    liDOM.innerHTML = items.item;
    items.isChecked ? liDOM.classList.add('checked') :"";
    ulDOM.appendChild(liDOM);
    spanDOM.classList.add('close');
    spanDOM.innerHTML = "x"
    liDOM.appendChild(spanDOM);
}

function getLocalStorage() {
    //TO GET LOCAL STORAGE
    let items = localStorage.getItem("items");
    items = JSON.parse(items);
    return items;
}

function setLocalStorage(items) {
    //TO SET LOCAL STORAGE
    localStorage.setItem('items', JSON.stringify(items));
}