const ApplicationController = require('./ApplicationController');
//import model users, product
const { users, products } = require('../../../models');

class OrderController extends ApplicationController{
    // get all data order from tabel order join with table users & products where id user equal with user login
    getAllOrder = async (req, res, next) => {
        try{
            const user_id = req.user.id;
            const order = await products.findAll({
                include: [{
                    model: users,
                    attributes: ['full_name', 'email', 'phone', 'city', 'address', 'image_url'],
                    where: {
                        id: user_id
                    }

}