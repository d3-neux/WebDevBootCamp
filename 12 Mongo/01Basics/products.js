const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("connection established");
})
.catch(err => {
    console.log('Error !! ', err);
})


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be positive dude!!"]
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

productSchema.methods.greet = function () {
    console.log('Hello, howdy neighbor');
    console.log(` - from ${this.name}`);
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}


productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 });
}







const Product = mongoose.model('Product', productSchema);



const findProduct = async (properties) => {
    const foundProduct = await Product.findOne(properties);
    foundProduct.greet();
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('outdoors');
    console.log(foundProduct);
}

Product.fireSale()
    .then(res => console.log(res));


findProduct({ name: 'Bike helmet' });
findProduct({ name: 'Mountain Bike' });

// const bike = new Product({ name: 'Tire Pump', price: 19.50, categories: ['Cycling']});
// bike.save()
//     .then(data => {
//         console.log("IT Worked");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Error");
//         console.log(err);
//     })


// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -10.29}, {new: true, runValidators: true})
//     .then(data => {
//         console.log("IT Worked");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Error");
//         console.log(err);
//     })


// const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'S'});
// bike.save()
//     .then(data => {
//         console.log("IT Worked");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Error");
//         console.log(err);
//     })