
let greetingName = getName();
let myName = document.querySelector("#myName");
let myClock = document.querySelector("#myClock");

myName.style.color = "greenyellow";
myName.innerHTML = capitilazeFirstLetter(greetingName);


function getName() {
    // İSİM ÇAĞIRAN FONKSİYON
    // İPTALE BASILMASI YA DA İSMİN BOŞ GEÇİLMESİ HALİNDE UYARIR VE TEKRAR İSİM İSTER
    while (true) {
        let greetingName = prompt("İsminiz nedir: ")
        if (greetingName) {
            return greetingName;
            break;
        } else {
            alert("Lütfen boş bırakmayın ya da iptale basmayınız.");
        }
    }
}



function capitilazeFirstLetter(str) {
    //GİRİLEN KELİME YA DA KELİME GRUPLARININ İLK HARFLERİNİ BÜYÜK YAPAR
    const arr = str.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
}


function showTime() {
    //ZAMANI VE TARİHİ  XX.XX.XX "STR DAY" ŞEKLİNDE GÖSTERİR
    const dayList = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let d = dayList[date.getDay()];

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    let screenFormatDate = h + ":" + m + ":" + s + " " + d;
    myClock.innerHTML = screenFormatDate;

    setTimeout(showTime, 1000);
}

showTime()