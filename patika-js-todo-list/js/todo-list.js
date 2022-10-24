/*  
    1. UL list under container div
    2. UL element ID: "list"
*/
let countainerDOM = document.querySelector('.container');
let ulDOM = document.createElement('ul');
ulDOM.id = "list"
countainerDOM.appendChild(ulDOM);
ulDOM.addEventListener('click', checkedElement)

/* 
    1. Function: Create li element
*/

let counter = 0;
let textInput = document.querySelector('#task')

const newElement = (event => {
    if (textInput.value.trim()) {
        let liDOM = document.createElement('li');
        let spanDOM = document.createElement('span');
        liDOM.id = `li-${counter}`;
        liDOM.innerHTML = textInput.value.trim();
        ulDOM.appendChild(liDOM);
        spanDOM.classList.add('close');
        spanDOM.innerHTML = "x"
        liDOM.appendChild(spanDOM);
    } else {

    }
    textInput.value = "";
}
);

function checkedElement(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    }
}


// ulDOM.addEventListener('click', function(ev) {
//     if (ev.target.tagName === 'LI') {
//       ev.target.classList.toggle('checked');
//     }
//   }, false);

//   function(ev) {
//     if (ev.target.tagName === 'LI') {
//       ev.target.classList.toggle('checked');
//     }
//   }, false);

// function checkedList(event) {
//     if (element.target.tagName === 'LI') {
//         element.target.classList.toggle('checked');
//     }
// };



