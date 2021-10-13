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

const userSchema = new Schema({
    username: String,
    age: Number
    
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweet = async () => {
    // const user = new User({ username: 'chickenfan99', age: 61 });
    const user = await User.findOne({username: 'chickenfan99'})
    // const tweet1 = new Tweet({ text: 'oooooo neeeleee ', likes: 0 });
    const tweet1 = new Tweet({ text: 'wth are u doing with the chicken!!!', likes: 100 });

    tweet1.user = user;

    await user.save();
    await tweet1.save();

    console.log(tweet1);
    console.log(user);


}


// makeTweet();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user');

    console.log(t)
}

findTweet();