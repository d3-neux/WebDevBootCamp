const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const Farm = require('./models/farm');


const AppError = require('./AppError');
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


//FARM ROUTES

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', {farms});
})


app.get('/farms/new', (req, res) => {
    res.render('farms/new')
});

app.get('/farms/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id).populate('products');
    if (!farm) {
        throw new AppError('not found', 404);
    }

    // console.log("hello" + farm)
    res.render('farms/show', { farm })
}));

app.get('/farms/:id/edit', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('farms/edit', { farm })
});

app.post('/farms', wrapAsync(async (req, res, next) => {
    const farm = new Farm(req.body);
    await farm.save();

    res.redirect('/farms');
}));

app.get('/farms/:id/products/new', async(req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', {categories, farm})
});

app.post('/farms/:id/products', async (req, res) => {
    const { name, price, category } = req.body;
    const { id } = req.params;
    const farm = await Farm.findById(id);

    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;

    await farm.save();
    await product.save();
    
    // res.send(farm + " - "+  product)
    res.redirect(`/farms/${id}`)
})

app.delete('/farms/:id/', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findByIdAndDelete(id);
    res.redirect('/farms/');
});

app.put('/farms/:id/', wrapAsync (async (req, res, next) => {
    // try {
        const { id } = req.params;
        const updatedFarm = await Farm.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        res.redirect(`/farms/${updatedFarm._id}`);
    // } catch (e) {
    //     next(e);
    // }

}));





//PRODUCT ROUTES

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
    // throw new AppError('not allowed', 401);
    res.render('products/new', { categories });
})



function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name')
    if (!product) {
        throw new AppError('not found', 404);
    }
    res.render('products/show', { product })
}));

app.post('/products', wrapAsync(async (req, res, next) => {
    // try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct.id}`);
    // } catch (e) {
    //      next(e);
    // }
}));

app.get('/products/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        return next(new AppError('not found...', 404));
    }

    res.render('products/edit', { product , categories})
});


app.put('/products/:id/', wrapAsync (async (req, res, next) => {
    // try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        res.redirect(`/products/${updatedProduct._id}`);
    // } catch (e) {
    //     next(e);
    // }

}));

app.delete('/products/:id/', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    console.log(product);
    res.redirect('/products');
});

const handleValidationError = err => {
    console.log(err);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") err = handleValidationError(err);

    next(err);
})


app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    console.dir(err);
    res.status(status).send(message);
})


app.listen(3000, () => {
    console.log('listening on 3000');
});