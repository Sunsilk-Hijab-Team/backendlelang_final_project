const express = require('express');

const { check, body, validationResult, checkSchema } = require('express-validator');


    runValidation = (req, res, next) => {

        const error = validationResult(req.body);

        if (!error.isEmpty()) {
            return res.status(422).json({
                error: error.array()[0].msg,
                status: 'Error'
            });
        }

        next();

    }

    checkName = [
        check('full_name')
        .notEmpty()
        .withMessage('Name cannot be empty'),
    ],

    checkEmail = [
        check('email')
        .isEmail()
        .withMessage('Email not valid')
        .notEmpty()
        .withMessage('Email address cannot be empty'),
    ]

    checkPassword = [
         check('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    ]

    checkCity = [
        check('city')
        .notEmpty()
        .withMessage('City cannot be empty'),
    ]

     checkAddress = [
        check('address')
        .notEmpty()
        .withMessage('Addess cannot be empty'),
    ]

    checkCategory = [
        check('name')
        .notEmpty()
        .withMessage('Category cannot be empty')
    ]

    checkProductName = [
        body('name')
        .notEmpty()
        .withMessage('Product name cannot be empty')
    ]

    checkDescription = [
        body('description')
        .notEmpty()
        .withMessage('Description cannot be empty')
    ]

    checkPrice = [
        body('base_price')
        .isNumeric()
        .withMessage('Price must be a number')
        .notEmpty()
        .withMessage('Price cannot be empty')
    ]

    checkSearch = [
        check('keyword')
        .notEmpty()
        .withMessage('Keyword cannot be empty')
    ]

    checkSlug = [
        check('slug')
        .notEmpty()
        .withMessage('Category cannot be empty')
    ]




    // runValidation = [
    //     check('full_name')
    //     .notEmpty()
    //     .withMessage('Name cannot be empty'),

    //     check('email')
    //     .notEmpty()
    //     .withMessage('Email address cannot be empty'),

    //      check('password')
    //     .notEmpty()
    //     .withMessage('Password cannot be empty')
    //     .isLength({ min: 8 })
    //     .withMessage('Password must be at least 8 characters long'),
    // ]


module.exports = {  runValidation,
                    checkName,
                    checkEmail,
                    checkPassword,
                    checkCity,
                    checkAddress,
                    checkCategory,
                    checkProductName,
                    checkDescription,
                    checkPrice,
                    checkSearch,
                    checkSlug
                };