document.querySelector('button').addEventListener('click', function (evt) {
    console.log(evt);
})


document.querySelector('input').addEventListener('keydown', evt => {

    console.log('down ' + evt.key);

})