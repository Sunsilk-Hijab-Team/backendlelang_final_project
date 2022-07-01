const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
// const password="rahasia";
=======
const SALT = process.env.SALT || 10;
const { users } = require('../models');

>>>>>>> alifahrial
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

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
}

module.exports = {
<<<<<<< HEAD
    encryptedPassword, comparePassword, createToken, verifyToken
=======
    encryptedPassword,
    createToken,
    comparePassword,
    verifyToken
>>>>>>> alifahrial
}