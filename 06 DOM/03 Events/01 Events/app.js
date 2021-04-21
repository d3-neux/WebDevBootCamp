const btn = document.querySelector('#v2');


btn.onclick = function () {
    console.log("you clicked me");
}




const tas = document.querySelector("#tas");


const shout = () => console.log("shout");


tas.addEventListener('click', shout, {once: true});
tas.addEventListener('click', () => console.log("twist"));




const hello = document.querySelector("#hello");
const goodbye = document.querySelector("#goodbye");


hello.addEventListener('clic', () => console.log("hello"));
goodbye.addEventListener('clic', () => console.log("goodbye"));