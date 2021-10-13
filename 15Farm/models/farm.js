const mongoose = require('mongoose');
const Product = require('./product');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name']
    },
    city: {
        type: String,

    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});


farmSchema.pre('findOneAndDelete', async function (data) {
    console.log('premiddleware')
    console.log(data)
})

farmSchema.post('findOneAndDelete', async function (farm) {
    
    if (farm.products.length) {
        const result = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(result);
    }
})




const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;
