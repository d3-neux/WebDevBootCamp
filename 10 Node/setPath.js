const fs = require('fs');
const folderName = process.argv[2] || "Project";

//async
// fs.mkdir('Dogs', { recursive: true }, (err) => {
//     console.log('in the callback');
//     if (err) throw err;
// });


fs.mkdirSync(folderName);
fs.writeFileSync(`${folderName}/index.html`,``);
fs.writeFileSync(`${folderName}/app.js`,``);
fs.writeFileSync(`${folderName}/app.css`,``);


