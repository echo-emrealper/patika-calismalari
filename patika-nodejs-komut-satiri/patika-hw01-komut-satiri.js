//Yarıçap için atama yapılır.
const radius = +process.argv.slice(2, 3);

// Daire alanını dönen fonksiyon
const getCircleArea = (r) => {
    const cirleArea = (Math.PI * (r ** 2)).toFixed(2);
    return cirleArea;
}

//Sonucun ekrana basılması
console.log(getCircleArea(radius));
