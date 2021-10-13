const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipsDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('open!!!');
    })
    .catch(err => {
        console.log('error connecting to db');
        console.log(err);
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {id:false},
            street: String,
            city: String,
            state: String,
            country: { type: String, required: true }
        }
    ]
})


const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'harry',
        last: 'potter'
    })

    // console.log(u);

    u.addresses.push({
        street: '12 Sesame st',
        city: 'New York',
        state: 'NY',
        country: 'USA'

    })

    const res = await u.save();
    console.log(res)
}


const addAddress = async(id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '93 rd St',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })

    const res = await user.save();
    console.log(res)
}

//makeUser();

addAddress('612eaddfcc45e8f9647a8ea8');