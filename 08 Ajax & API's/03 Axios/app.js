// axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res => {
//         console.log('data: ', res.data.ticker.price);
//     })
//     .catch(e => {
//         console.log('error', e);
//     })
    


// const fetchBitcoinPrice = async () => {
//     try {
//         const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd');
//         console.log('ssss: ', res.data.ticker.price);
//     }
//     catch (e) {
//         console.log('error', e);
//     }
// }

//fetchBitcoinPrice();

const jokes = document.querySelector('#jokes');
const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    }
    catch (e) {
        console.log('no jokes available', e);
    }
}

const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    const newLi = document.createElement('li');
    newLi.append(jokeText);
    jokes.append(newLi);
}

const button = document.querySelector('button');
button.addEventListener('click', addNewJoke);
