const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const password = '123456'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
})

const hashedPassword = '$2a$10$bdcUlBh5r6yBPqjkobooiOOMr1qRIDtnOiUbDDZQGhVuY5c0fR4Du';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})






// const data = {
//   id: 10,
//   name: 'Kozel'
// }
//
// const token = jwt.sign(data.id, '123abc');
//
// console.log(token);
//
// const decoded = jwt.verify(token, '123abc');
// console.log('Decoded:');
// console.log(decoded);





// const message = 'I am a real hacker!';
// const hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
//
// const data = {
//   id: 4
// };
//
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// token.data.id = 5;
// console.log(token.data)
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data changed - NO TRUST');
// }
