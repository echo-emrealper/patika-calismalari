let greetingName = getName();
let myName = document.querySelector("#myName");
let myClock = document.querySelector("#myClock");

myName.style.color = "greenyellow";
myName.innerHTML = showName(greetingName);

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

function showName(str) {
    // STRING DEĞERİ DİZİYE ATAYIP, İLK HARFLERİ BÜYÜK YAPAN FONKSİYONU ÇAĞIRIR
    const arr = str.split(" ");
    // DİZİDE GEZEREK HER ELEMANIN İLK HARFİNİ BÜYÜK YAPAR
    arr.forEach((item, index, arr) => arr[index] = item.charAt(0).toUpperCase() + item.slice(1))
    str = arr.join(" ")
    return str;
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