const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo connection open!!!");
})
.catch(err => {
    console.log('Mongo connection Error !!! ', err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];


app.get('/products', async (req, res) => {
    let { category } = req.query;
    let products;
    
    if (category)
        products = await Product.find({ category });
    else{
        products = await Product.find();
        category = "All"
    }

    
    res.render('products/index', { products, category});

        



    
});

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    res.render('products/show', { product })
});

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct.id}`);
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product , categories})
});


app.put('/products/:id/', async (req, res) => {
    const { id } = req.params;
    
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

    res.redirect(`/products/${updatedProduct._id}`);


});

app.delete('/products/:id/', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    console.log(product);
    res.redirect('/products');
});



app.listen(3000, () => {
    console.log('listening on 3000');
});