const franc = require("franc");
const langs = require("langs");

const params = process.argv.slice(2);

params.forEach(function (val, index, array) {
    //console.log(franc(val));
    console.log(langs.where('3', franc(val))['name']);
    //console.log(val);
})
