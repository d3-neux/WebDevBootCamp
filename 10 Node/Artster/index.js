const figlet = require("figlet");
const colors = require("colors");

figlet('Hello world!!!', function (err, data) {
    if (err) {
        console.log('something');
        console.dir(err);
        return;
    }
    console.log(data.green);
})