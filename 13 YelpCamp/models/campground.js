const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


// https://res.cloudinary.com/d3neux/image/upload/w_500/v1634707732/YelpCamp/xgcktndhkexmcqabwnpx.png


const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new Schema({
    title: {type: String, required: true},
    images: [ImageSchema],

    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    price: {type: Number, required: true},
    description: {type: String, required: true},
    location: { type: String, required: true },
    author: {type: Schema.Types.ObjectId, ref:'User'},
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});



CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema);