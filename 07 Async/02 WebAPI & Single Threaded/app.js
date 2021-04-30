let iteration = 0;
let colors = ['red', 'orange', 'green']

// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
//     setTimeout(() => {
//         document.body.style.backgroundColor = 'orange';
//             setTimeout(() => {
//                 document.body.style.backgroundColor = 'green';
//             }, 1000)
//     }, 1000)
// }, 1000)



const delayedColorChange = (newColor, delay, doNext) => {
    setTimeout(() => {
        document.body.style.backgroundColor = newColor;
        doNext && doNext();
    }, delay);
};

delayedColorChange('red', 1000, () => {
    delayedColorChange('orange', 1000, () => {
        delayedColorChange('green', 1000, () => {
        
        })
    });
});

