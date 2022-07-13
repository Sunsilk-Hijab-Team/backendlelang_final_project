const ApplicationController = require("./ApplicationController");
const authHelper = require('../../../helpers/AuthenticationHelper');
const jwt = require("jsonwebtoken");
const { Users } = require('../../../models/index');
const cloudinary = require("../../../middlewares/cloudUpload");

const userModel = Users;

class AuthenticationController extends ApplicationController{

    handleRegister = async (req, res, next) => {
        try {
            const name = req.body.full_name;
            const email = req.body.email.toLowerCase();
            const password = await authHelper.encryptedPassword(req.body.password);

            let existingUser = await Users.findOne({ where: { email: email } });


            if (existingUser) {
                res.status(409).json({
                    status: 'Error',
                    message: 'Email already exists'
                 });
                return;
            }

            const user = await Users.create({
                full_name: name,
                email: email,
                password: password
            })
            // .catch(err => {
            //     console.log(err);
            // })

            const payload = {
                id: user.id,
                full_name: name,
                email: email,
                password: password,
                phone: null,
                city: null,
                address: null,
                image_url: null,

            }

            const token = await authHelper.createToken(payload);

            res.status(201).json({
                status: 'Success',
                user,
                token
            })

        } catch (error) {
             res.status(500).json({
                error: error.message,
                message: 'Something went wrong - Ini register routes'
            });
        }
    }

    handleLogin = async (req, res, next) => {
        try{
            // console.log(req.body, '-reqbody');
            const email = req.body.email.toLowerCase();
            const password = req.body.password;
            const user = await Users.findOne({ where: { email } });
            if (!user) {
                res.status(409).json({
                    status: 'Error',
                    message: 'Invalid Email or Password'
                });
                return;
            }

            const isPasswordValid = await authHelper.comparePassword(password, user.password);

            if((!isPasswordValid)) {
                res.status(409).json({
                    status: 'Error',
                    message: 'Password is incorrect'
                });
                return;
            }

            const payload = {
                id: user.id,
                full_name: user.full_name,
                email,
                password,
                city: user.city,
                address: user.address,
                image_url: user.image_url,
            }

            const token = await authHelper.createToken(payload);

            res.status(200).json({
                status: 'Success',
                user,
                token
            })

        }catch(error){
            console.log(error);
            res.status(500).json({
                message: error.message,
                message: 'Something went wrong'
            });
        }
    }

    handleUpdate = async (req, res, next) => {
        try {

            //comfigure uploaded file to cloudinary
            if(req.file){

                const fileBase64 = req.file.buffer.toString('base64');
                const file = `data:${req.file.mimetype};base64,${fileBase64}`;
                const url = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(file, function(err, result){
                        if(err){
                            reject(err);
                        } else {
                            resolve(result.url);
                        }
                    });
                });

                const name = req.body.full_name;
                const phone = req.body.phone;
                const city = req.body.city;
                const address = req.body.address;
                const img = url

                const userUpdate = await userModel.update({
                    full_name: name,
                    phone:  phone,
                    city: city,
                    address: address,
                    image_url: img
                }, {
                    where: { id: req.user.id, },
                });

                 res.status(200).json({
                    status: 'Success',
                    userUpdate
                })

            } else {

                const name = req.body.full_name;
                const phone = req.body.phone;
                const city = req.body.city;
                const address = req.body.address;

                const userUpdate = await userModel.update({
                    full_name: name,
                    phone:  phone,
                    city: city,
                    address: address,
                }, {
                    where: { id: req.user.id, },
                });

                res.status(200).json({
                    status: 'Success',
                    userUpdate
                })
            }


        }catch(error){
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

    handleGetCurrentUser = async (req, res, next) => {

        try {
            const user = await Users.findByPk(req.user.id);

            if(!user) {
                res.status(401).json({
                    message: 'User not found'
                });
                return;
            }

            res.status(200).json({
                status: 'Success',
                user,
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }
    // handle logout
    // handleLogout = async (req, res, next) => {
    //     // empty session user
    //     req.session.user = null;
    //     res.status(200).json({
    //         status: 'success',
    //         message: 'Logout success'
    //     })
    // }

}

module.exports = AuthenticationController;