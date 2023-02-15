const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    switch (url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<h2 style = "color:blue">INDEX SAYFASINA HOŞGELDİNİZ</h2>');
            break;
        case '/hakkimda':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<h2 style = "color:blue">HAKKIMDA SAYFASINA HOŞGELDİNİZ</h2>');
            break;
        case '/iletisim':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<h2 style = "color:blue">İLETİŞİM SAYFASINA HOŞGELDİNİZ</h2>');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<h2 style = "color:red">404: SAYFA BULUNAMADI</h2>');
            break;
    };

    res.end();

});

const port = 5000;

server.listen(port, () => {
    console.log(`Sunucu port ${port} üzerinde baslatildi.`);
});