const req = new XMLHttpRequest();

req.onload = function () {
    console.log('all done with requests!!!');
    
    const data = JSON.parse(this.responseText);

    console.log(data.ticker.price);
}

req.onerror = function () {
    console.log('error');
    console.log('this')
}


req.open('get', 'https://api.cryptonator.com/api/ticker/btc-usd')
req.send();