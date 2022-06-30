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
            // console.log({name, email, password, phone, address, img});

            let existingUser = await users.findOne({ where: { email, }, });

            // console.log(existingUser);

            console.log('ini cek');
            if (existingUser != null) {
                res.status(409).json({
                    message: 'Email already exists'
                 });
                return;
            }


            console.log('masukin');
            const user = await users.create({
                full_name: name,
                email: email,
                password: password,
                phone: phone,
                city: city,
                address: address,
                image_url: img,
                deletedAt: new Date()
            }).catch(err => {
                console.log(err);
            })


            console.log('token');

            const token = await authHelper.createToken(user);

            console.log(token);

            console.log('oke');

            res.status(201).json({
                status: 'success',
                user,
                token
            })

        } catch (error) {
             res.status(500).json({
                message: 'Something went wrong - Ini register routes'
            });
        }
    }

    handleLogin = async (req, res, next) => {
        try{
            const email= req.body.email.toLowerCase();
            const password = req.body.password;
            // console.log({email, password});
            const user = await userModel.findOne({ where: { email } });
            const isPasswordValid = await authHelper.comparePassword(password, user.password);

            if((!isPasswordValid)||(!user)) {
                res.status(401).json({
                    message: 'Invalid email or password'
                });
                return;
            }

            const token = await authHelper.createToken(user);
            res.status(200).json({
                status: 'success',
                token
            })

        }catch(error){
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