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
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sampleFromArray(descriptors)} ${sampleFromArray(places)}`
        });
        await camp.save();
    }

}

const sampleFromArray = (array) => array[Math.floor(Math.random() * array.length)];

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database disconnected');
})