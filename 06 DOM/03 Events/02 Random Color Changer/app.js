
const btn = document.querySelector("#change");
const h1 = document.querySelector("h1");

btn.addEventListener('click', () => {
    
    
    const newColor = randomColors();

    document.body.style.backgroundColor = newColor;
    h1.innerText = newColor;
})


const randomColors = () => {
    const randomNumber = () => Math.floor(Math.random() * 256) + 1;

    return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
}





