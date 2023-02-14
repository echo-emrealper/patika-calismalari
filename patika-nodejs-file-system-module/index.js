const { readFile, writeFile, appendFile, unlink } = require('fs');

appendFile("./employees.json", '{ "name": "Employee 1 Name", "salary": 2000 }', "utf8", (err) => {
    if (err) return console.log(err);
    console.log("Dosya oluşturuldu.");

    readFile("./employees.json", "utf-8", (err, data) => {
        if (err) return console.log(err);
        console.log(data);
        console.log(('Dosya okundu.'));

        writeFile("./employees.json", '{ "name": "Employee 1 Name", "salary": 7000 }', "utf8", (err) => {
            if (err) return console.log(err);

            readFile("./employees.json", "utf-8", (err, data) => {
                if (err) return console.log(err);
                console.log(data);
                console.log("Dosya güncellendi.");

                unlink("./employees.json", (err) => {
                    if (err) return console.log(err);
                    console.log("Dosya silindi.");
                });
            });
        });
    });
});