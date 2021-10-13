const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('mongo connection open')
    })
    .catch(err => {
        console.log("Error!!!!!");
        console.log(err);

    })

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum:['Spring', 'Summer', 'Fall', 'Winter']
    }
})

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     {name: 'Goddes melon', price: 4.99, season: 'Summer'},
//     {name: 'Water melon', price: 3.99, season: 'Fall'},
//     {name: 'poor little melon', price: 1.29, season: 'Winter'},
// ])

// const makeFarm = async () => {
//     const farm = new Farm({ name: `Old Sam's farm`, city: 'Quiti' })
//     const melon = await Product.findOne({ name: 'poor little melon' })
    
//     farm.products.push(melon);
//     const res = await farm.save();
//     console.log(res);
// }

// makeFarm()

const addProduct = async () => {
    const farm = await Farm.findOne({ name: "Old Sam's farm" });
    const watermelon = await Product.findOne({ name: 'Water melon' });

    farm.products.push(watermelon);
    await farm.save();
    console.log(farm)
}


// addProduct();

Farm.findOne({ name: "Old Sam's farm" })
    .populate('products')
    .then(farm => console.log(farm));