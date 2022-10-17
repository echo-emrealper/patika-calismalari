//DOM değişkenleri tanımları
let containerDom = document.querySelector(".container");
let counterDom = document.querySelector("#counter");
let increaseDom = document.querySelector("#increase");
let decreaseDom = document.querySelector("#decrease");
let getDom = document.querySelector("#getbutton");
let counter = 0;
let picsumDom = document.querySelector("#picsum");
let picsumInfoDom = document.querySelector("#picsumINFO");
let picLink = document.querySelector("#picLink");

//DOM stilleri
containerDom.classList.add("text-center", "bg-success", "my-5", "p-5");
containerDom.style.fontSize = "2em";
counterDom.classList.add("text-center");
picsumDom.classList.add("ml-2", "w-100")
picsumInfoDom.style.fontSize = "0.6em";
picLink.style.fontSize = "0.6em";

//DOM başlangıç setleme
picsumDom.src = `https://picsum.photos/id/0/800/600`;
picsumInfoDom.innerHTML = `https://picsum.photos/id/0/info`;
picLink.innerHTML = `https://picsum.photos/id/0/800/600`;
counterDom.value = "0";

//DOM Events
getDom.addEventListener("click", clickEvent);
increaseDom.addEventListener("click", clickEvent);
decreaseDom.addEventListener("click", clickEvent);

function clickEvent() {
    picLink.style.color ="black";
    picsumInfoDom.style.color ="black"
    //Buton Events
    if (this.id == "getbutton") {
        picsumDom.src = `${getPicsum(counterDom.value)}`;
        picsumInfoDom.innerHTML = `${getPicsumInfo(counterDom.value)}`;
        counter = counterDom.value;
        picLink.innerHTML = `${getPicsum(counterDom.value)}`;
        picsumInfoDom.innerHTML = `${getPicsumInfo(counterDom.value)}`;
    } else {
        (this.id == "decrease") ? (counter > 0 ? counter-- : 0) : counter++;
        counterDom.value = counter;
        picsumDom.src = `${getPicsum(counter)}`;
        picsumInfoDom.innerHTML = `${getPicsumInfo(counter)}`;
        picLink.innerHTML = `${getPicsum(counter)}`;
        picsumInfoDom.innerHTML = `${getPicsumInfo(counter)}`;
    }
}

function getPicsum(picsumIDNumber) {
    //Picsum linklerini string olarak getirme
    let str = `https://picsum.photos/id/${picsumIDNumber}/800/600`
    return str;
}

function getPicsumInfo(picsumIDNumber) {
    //Picsum link infolarını string olarak getirme
    let str = `https://picsum.photos/id/${picsumIDNumber}/info`
    return str;
}

function notExistImage() {
        picsumDom.src = `https://rasmusbroennum.files.wordpress.com/2011/11/non-existent.jpg`;
        picLink.innerHTML = `--- ID:NULL ---`;
        picLink.style.color ="red"
        picsumInfoDom.innerHTML = `--- ID: NULL ---`;
        picsumInfoDom.style.color ="red"

}

