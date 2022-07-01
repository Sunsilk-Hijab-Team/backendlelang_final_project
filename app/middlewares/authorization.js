const jwt = require("jsonwebtoken");
const { Users } = require("../models/index");

module.exports = {

    async checkToken (req, res, next){
        try {

            const checkToken = req.headers.authorization;
            const token = checkToken.split("Bearer ")[1];
            const payload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
            req.user = await Users.findByPk(payload.user.id);

            next();

        } catch (error) {
            res.status(401).json({
                status: "Error",
                message: "Unauthorized",
            })
        }
    },

//     async userLogin (req, res, next){

//        try {
//            const checkToken = req.headers.authorization;
//            const token = checkToken.split("Bearer ")[1];
//            const payload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);
//            const user = await users.findByPk(payload.user.id);

//            next();

//        } catch (error) {
//            res.status(401).json({
//                status: "Error",
//                message: "Unauthorized",
//            })
//        }
//    }


}
