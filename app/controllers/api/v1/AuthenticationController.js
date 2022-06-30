const ApplicationController = require("./ApplicationController");
const { users } = require('../../../models');
const authHelper = require('../../../helpers/AuthenticationHelper');

const userModel = users;
class AuthenticationController extends ApplicationController{

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
                console.log('ini ada');
                // res.status(409).json({
                //     message: 'Email already exists'
                //  });
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
                image_url: img
            })

            console.log('token');

            const token = await authHelper.createToken(user);

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

    handleUpdate = async (req, res, next) => {
        try {
            const user = await userModel.findOne({ where: { id: req.user.id, }, });
            if (!user) {
                res.status(404).json({
                    message: 'User not found'
                });
                return;
            }
            const name = req.body.full_name;
            const email = req.body.email.toLowerCase();
            const password = authHelper.encryptedPassword(req.body.password);
            const updatedUser = await userModel.update({
                email: email,
                full_name: name,
                password: password,
            }, {
                where: { id: req.user.id, },
            });
            res.status(200).json({
                status: 'success',
                user: updatedUser,
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }

}

module.exports = AuthenticationController;