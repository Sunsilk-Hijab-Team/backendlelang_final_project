const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT = process.env.SALT || 10;
const { Users } = require('../models');

function encryptedPassword(password)
{
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            console.log(password, '-<<-password', hash, '--hash');
            if(err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

// console.log (encryptedPassword(password));
function comparePassword(password, hash){
    // console.log(password, hash, '--ininih');
    // console.log(typeof password, typeof hash, '--typeof');
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if(err) {
                reject(err);
            } else {
                // console.log(result, '---> result');
                resolve(result);
            }
        });
    });
}
// console.log (comparePassword(password, encryptedPassword(password)));
// create token for user
// function createToken(user) {
//     return jwt.sign({
//         id: user.id
//     },
//     process.env.JWT_SIGNATURE_KEY
//     );
// }
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
}

function createToken(user)
{
    // console.log(user, process.env.JWT_SIGNATURE_KEY, '--');
    return new Promise((resolve, reject) => {
        jwt.sign({user}, process.env.JWT_SIGNATURE_KEY, (err, token) => {

            if(err){
                // console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

// function comparePassword(password, hash){
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(password, hash, (err, result) => {
//             if(err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }

// function verifyToken(token) {
//     return jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
// }

module.exports = {
    encryptedPassword,
    createToken,
    comparePassword,
    verifyToken
}