const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDB = async () => {
    await Campground.deleteMany({});
    
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '616fabbf942b5f4d38883999',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sampleFromArray(descriptors)} ${sampleFromArray(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi harum quas quisquam. Minima dolor aspernatur iure eum vitae facilis voluptate praesentium tenetur delectus, nihil sint non alias hic, dicta in!',
            price,
            geometry: { type: 'Point', coordinates: [ -113.1331, 47.0202 ], },
            images: [{
                url: 'https://res.cloudinary.com/d3neux/image/upload/v1634707732/YelpCamp/xgcktndhkexmcqabwnpx.png',
                filename: "YelpCamp/xgcktndhkexmcqabwnpx"
            },
            {
                url: "https://res.cloudinary.com/d3neux/image/upload/v1634707768/YelpCamp/kcx0cw6urdip5qxmkeqe.jpg",
                filename: "YelpCamp/kcx0cw6urdip5qxmkeqe"
            }]
        });
        await camp.save();
    }

}

const sampleFromArray = (array) => array[Math.floor(Math.random() * array.length)];

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database disconnected');
})