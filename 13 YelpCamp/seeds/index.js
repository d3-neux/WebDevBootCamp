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
            author: '61661db8c7a1392f90fdd9ef',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sampleFromArray(descriptors)} ${sampleFromArray(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi harum quas quisquam. Minima dolor aspernatur iure eum vitae facilis voluptate praesentium tenetur delectus, nihil sint non alias hic, dicta in!',
            price
        });
        await camp.save();
    }

}

const sampleFromArray = (array) => array[Math.floor(Math.random() * array.length)];

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database disconnected');
})