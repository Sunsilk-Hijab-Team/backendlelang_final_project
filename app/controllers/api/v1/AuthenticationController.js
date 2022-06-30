const ApplicationController = require("./ApplicationController");
const { users } = require('../../../models/index');
const authHelper = require('../../../helpers/AuthenticationHelper');

const userModel = users;
class AuthenticationController extends ApplicationController{


     // authorize process
    handleAuthorize = async (req, res, next) => {
        try{
            const token=req.headers.authorization.split(" ")[1];
            const decodedToken=authHelper.verifyToken(token);
            const user=await userModel.findOne({where:{id:decodedToken.id}});
            req.user=user;
            next();
        }catch{
            res.status(401).json({
                message:"Unauthorized"
            })
        }
    }

    handleRegister = async (req, res, next) => {
        try {

            const name = req.body.full_name;
            const email = req.body.email.toLowerCase();
            const password = await authHelper.encryptedPassword(req.body.password);
            const phone = req.body.phone;
            const city = req.body.city;
            const address = req.body.address;
            const img = req.body.image_url;

            let existingUser = await users.findOne({ where: { email: email } });


            if (existingUser) {
                res.status(409).json({
                    message: 'Email already exists'
                 });
                return;
            }
            const user = await users.create({
                full_name: name,
                email: email,
                password: password,
                phone: phone,
                city: city,
                address: address,
                image_url: img,
            })
            // .catch(err => {
            //     console.log(err);
            // })

            const payload = {
                full_name: name,
                email: email,
                password: password,
                phone: phone,
                city: city,
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

            const user = await users.findOne({ where: { email } });

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
            }
            const token = await authHelper.createToken(payload);

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
            const email = req.body.email.toLowerCase();
            const password = authHelper.encryptedPassword(req.body.password);
            const phone = req.body.phone;
            const city = req.body.city;
            const address = req.body.address;
            const img = req.body.image_url;

            const updatedUser = await userModel.update({
                email: email,
                full_name: name,
                password: password,
                phone:  phone,
                city: city,
                address: address,
                image_url: img
            }, {
                where: { id: req.user.id, },
            });

            res.status(200).json({
                status: 'success',
                user: updatedUser,
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong - update users'
            });
        }
    }

    // handleGetCurrentUser = async (req, res, next) => {
    //     const user = await userModel.findByPk(req.user.id)
    // }

}

module.exports = AuthenticationController;