const socket = io();

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCategory = document.getElementById('category');
const inputStock = document.getElementById('stock');
const inputPrice = document.getElementById('price');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const category = inputCategory.value;
    const stock = inputStock.value;
    const price = inputPrice.value;

    const product = {
        title,
        description,
        category,
        stock,
        price
    };
    socket.emit('add-product', product);
    form.reset();
});
socket.on('product-list-update', (newProduct) => {
    const productItem = document.createElement('ul');
    productItem.innerHTML = `
        <li>Title: ${newProduct.title}</li>
        <li>Description: ${newProduct.description}</li>
        <li>Category: ${newProduct.category}</li>
        <li>Stock: ${newProduct.stock}</li>
        <li>Price: $${newProduct.price}</li>
    `;
    productContainer.appendChild(productItem);
});