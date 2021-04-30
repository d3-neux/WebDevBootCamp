// fetch('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res => {
//         console.log('response waiting to parse', res);
//         return res.json();
//     })
//     .then(data => {
//         console.log('data parsed: ', data);
//     })
//     .catch(e => {
//         console.log('oh no! error!', e)
//     });



const fetchBitcoinPrice = async () => {
    try {
        const res = await fetch('https://api.cryptonastor.com/api/ticker/btc-usd')
        const data = await res.json()
        console.log(data.ticker.price);
    }
    catch (e) {
        console.log('oh no! error!! ', e)
    }

}

fetchBitcoinPrice();