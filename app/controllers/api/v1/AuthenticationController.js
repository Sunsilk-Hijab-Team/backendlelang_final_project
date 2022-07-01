const ApplicationController = require("./ApplicationController");
const authHelper = require('../../../helpers/AuthenticationHelper');
const authorization = require("../../../middlewares/authorization");
const jwt = require("jsonwebtoken");
const { Users } = require('../../../models/index');
const userModel = Users;
class AuthenticationController extends ApplicationController{

     // authorize process
    // handleAuthorize = async (req, res, next) => {
    //     try{
    //         const token=req.headers.authorization.split(" ")[1];
    //         const decodedToken=authHelper.verifyToken(token);
    //         const user=await userModel.findOne({where:{id:decodedToken.id}});
    //         req.user=user;
    //         next();
    //     }catch{
    //         res.status(401).json({
    //             message:"Unauthorized"
    //         })
    //     }
    // }

    handleRegister = async (req, res, next) => {
        try {

            const name = req.body.full_name;
            const email = req.body.email.toLowerCase();
            const password = await authHelper.encryptedPassword(req.body.password);

            // const phone = req.body.phone;
            // const city = req.body.city;
            // const address = req.body.address;
            // const img = req.body.image_url;

            let existingUser = await Users.findOne({ where: { email: email } });


            if (existingUser) {
                res.status(409).json({
                    message: 'Email already exists'
                 });
                return;
            }
            const user = await Users.create({
                full_name: name,
                email: email,
                password: password,
                // phone: phone,
                // city: city,
                // address: address,
                // image_url: img,
            })
            // .catch(err => {
            //     console.log(err);
            // })

            const payload = {
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
                status: 'success',
                user,
                token
            })

        } catch (error) {
            console.log(error);
             res.status(500).json({
                message: 'Something went wrong - Ini register routes'
            });
        }
    }

    handleLogin = async (req, res, next) => {
        try{
            const email = req.body.email.toLowerCase();
            const password = req.body.password;

            const user = await Users.findOne({ where: { email } });

            if (!user) {
                res.status(401).json({
                    message: 'Email is incorrect'
                });
                return;
            }

            const isPasswordValid = await authHelper.comparePassword(password, user.password);

            if((!isPasswordValid)) {
                res.status(401).json({
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

            console.log(req.headers, '---');

            res.status(200).json({
                status: 'success',
                user,
                token
            })

        }catch(error){
            console.log(error);
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }

    handleUpdate = async (req, res, next) => {
        try {
            const name = req.body.full_name;
            const phone = req.body.phone;
            const city = req.body.city;
            const address = req.body.address;
            const img = req.body.image_url;

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
                status: 'success',
                userUpdate
            })

        }catch(error){
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }

    handleGetCurrentUser = async (req, res, next) => {

        try {
            // const checkToken = req.headers.authorization;
            // const token = checkToken.split("Bearer ")[1];
            // const payload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

            const user = await Users.findByPk(req.user.id);

            if(!user) {
                res.status(401).json({
                    message: 'User not found'
                });
                return;
            }

            res.status(200).json({
                status: 'success',
                user,
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }
    // handle logout
    handleLogout = async (req, res, next) => {
        // empty session user
        req.session.user = null;
        res.status(200).json({
            status: 'success',
            message: 'Logout success'
        })
    }

}

module.exports = AuthenticationController;