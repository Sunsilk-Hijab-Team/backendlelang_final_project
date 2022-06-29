const ApplicationController = require("./ApplicationController");
const { users } = require('../../../models');
const authHelper = require('../../../helpers/AuthenticationHelper');
const { or } = require("sequelize/types");


const userModel = users;
class AuthenticationController extends ApplicationController{

    handleRegister = async (req, res, next) => {
        // try {

        //     const name = req.body.full_name;
        //     const email = req.body.email.toLowerCase();
        //     const password = authHelper.encryptedPassword(req.body.password);

        //     let existingUser = await userModel.findOne({ where: { email, }, });

        //     if (!!existingUser) {
        //         res.status(409).json({
        //             message: 'Email already taken'
       //           });
        //         return;
        //     }
        //     const user = await userModel.create({
        //         email: email,
        //         full_name: name,
        //         password: password,
        //     })

        //     res.status(201).json({
        //         status: 'success',
        //         user,
        //     })


        // } catch (error) {

        // }
    }

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
    // login process handle
    handleLogin = async (req, res, next) => {
        try{
            const email= req.body.email.toLowerCase();
            const password = req.body.password;
            const user = await userModel.findOne({ where: { email } });
            const isPasswordValid = await authHelper.comparePassword(password, user.password);
            if((!isPasswordValid)||(!user)) {
                res.status(401).json({
                    message: 'Invalid email or password'
                });
                return;
            }
            const token = authHelper.createToken(user);
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

}

module.exports = AuthenticationController;