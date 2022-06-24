const ApplicationController = require("./ApplicationController");
const { users } = require('../../../models');
const authHelper = require('../../../helpers/AuthenticationHelper');

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

}

module.exports = AuthenticationController;