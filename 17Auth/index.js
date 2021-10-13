const bcrypt = require('bcrypt');


// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt)
//     console.log(hash);
// }

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async (pw, hashedPassword) => {
    const result = await bcrypt.compare(pw, hashedPassword);

    if (result) {
        console.log('logged you in')
    }
    else
    {
        console.log('try again');
    }
}

const hash = hashPassword('monkey');
// login('monkey', '$2b$12$lfJjfi67HBHaPsFkmfWsT.VCktrUxB1ZrDVKQqFmOk8ypxKgkV9lu');

