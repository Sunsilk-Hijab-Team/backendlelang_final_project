const { products } = require('../models');

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function generate(min, max) {

    let string = generateString(10);

    const m = Math.floor(Math.random() * (max - min) ) + min;
    return m+string;
}

module.exports = { generate };