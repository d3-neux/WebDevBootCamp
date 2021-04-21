const button = document.querySelector('#changeColor');
const container = document.querySelector('#container');


button.addEventListener('click', (e) => {
    container.style.backgroundColor = randomColors();
    e.stopPropagation();
});

container.addEventListener('click', () => {
    container.classList.toggle('hide');
})
const randomColors = () => {
    const randomNumber = () => Math.floor(Math.random() * 256) + 1;
    return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
}

