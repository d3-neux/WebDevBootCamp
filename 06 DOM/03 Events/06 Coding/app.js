// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');
const list = document.querySelector('#list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productInput = form.elements.product;
    const qtyInput = form.elements.qty;

    addListItem(productInput, qtyInput);


});



const addListItem = (product, qty) => {
    const newProduct = document.createElement('li');
    newProduct.innerText = `${qty.value} ${product.value}`;
    list.appendChild(newProduct);
    qty.value = '';
    product.value = '';

};