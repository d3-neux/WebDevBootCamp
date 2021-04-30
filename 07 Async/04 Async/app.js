// async function hello() { };

// const sing = async () => {
//     throw "wfh";
//     return "LALALALALA";
// };



// sing()
//     .then((data) => {
//     console.log('PROMISE RESOLVED WITH', data);
//     })
//     .catch((err) => {
//         console.log('ERROR!!!');
//         console.log(err);
//     })




const login = async (username, password) => {
    if (!username || !password) throw 'Missing Credentials';
    if (password === 'corgifeetarecute') return 'Hell yeah';

    throw "invalid password";
}


login('user', 'corgifeetarecuste')
    .then(msg => {
        console.log('LOGGED IN');
        console.log(msg);
    })
    .catch(err => {
        console.log('error');
        console.log(err);
    })