function circleArea(radius) {
    const result = (Math.PI * (radius ** 2)).toFixed(2);
    return console.log(`\nDairenin Alanı: ${result}\n`);
}

function circleCircumference(radius) {
    const result = (2 * Math.PI * radius).toFixed(2);
    return console.log(`Dairenin Çevresi: ${result}\n`);
}

module.exports = { circleArea, circleCircumference };