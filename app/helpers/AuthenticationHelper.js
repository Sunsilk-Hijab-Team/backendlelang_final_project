const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT = process.env.SALT || 10;

function encryptedPassword(password)
{
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

function createToken(user)
{
    console.log(user, process.env.JWT_SIGNATURE_KEY, '--');
    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.JWT_SIGNATURE_KEY || 'sunsilkhijabteam', (err, token) => {

            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    encryptedPassword,
    createToken
}