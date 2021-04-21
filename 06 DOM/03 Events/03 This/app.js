const makeRandomRGBColor = () => {
    const randomNumber = () => Math.floor(Math.random() * 255);

    return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
}


const buttons = document.querySelectorAll("button");

for (let button of buttons) {
    
    button.addEventListener('click', changeProperties);

}


const h1s = document.querySelectorAll('h1');

for (let h1 of h1s) {
    h1.addEventListener('click', changeProperties);
}

function changeProperties (){
    this.style.backgroundColor = makeRandomRGBColor();
    this.style.color = makeRandomRGBColor();
}