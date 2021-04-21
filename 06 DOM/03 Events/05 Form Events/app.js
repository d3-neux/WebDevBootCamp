const form = document.querySelector('#tweetForm');
const tweets = document.querySelector('#tweets');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.comment;
    addTweet(usernameInput.value, tweetInput.value);
    
    usernameInput.value = '';
    tweetInput.value = '';
})

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username);
    newTweet.append(bTag);
    newTweet.append(`- ${tweet}`);
    tweets.appendChild(newTweet);
}

