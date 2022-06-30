const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const password="rahasia";
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
// console.log (encryptedPassword(password));
function comparePassword(password, hash){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
// console.log (comparePassword(password, encryptedPassword(password)));
// create token for user
function createToken(user) {
    return jwt.sign({
        id: user.id
    }, 
    process.env.JWT_SIGNATURE_KEY
    );
}
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
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
    encryptedPassword, comparePassword, createToken, verifyToken
}