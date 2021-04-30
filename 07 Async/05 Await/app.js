
const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay);
    })
};


// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => location.reload())
//     .catch(() => console.log('error'));


async function rainbow() {
    await delayedColorChange('red', 1000)
    await delayedColorChange('green', 1000)
    await delayedColorChange('orange', 1000)
    return "all done"
    
}

rainbow().then(() => console.log("end of rainbow"))





/*****************/

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7)
                resolve('fake data here: ' + url);
            else
                reject('request error');
        }, 1000)
    })
}




async function makeTwoRequests() {
    try {
        let data1 = await fakeRequest('/page1/');
        console.log(data1);
        let data2 = await fakeRequest('/page2/');
        
        console.log(data2);
    }
    catch (e) {
        console.log('caught and error!');
        console.log('error is: ', e);
    }
}
