const ApplicationController = require('./ApplicationController');
//import model users, product
const { users, products, orders } = require('../../../models');

class OrderController extends ApplicationController{
    // get all data order from tabel order join with table users & products where id user equal with user login
    handleGetAllOrder = async (req, res, next) => {
        try{
            const user_id = req.user.id;
            const order = await orders.findAll({
                where: {
                    user_id
                },
                include: [
                    {
                        model: users
                    },
                    {
                        model: products
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if(!order){
                res.status(204).json({
                    status: 'success',
                    message: 'No content'
                });
                return;
            }
            res.status(200).json({
                status: 'success',
                order
            })
        }
        catch(error){
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }
    // get data order by id
    handleGetOrderById = async (req, res, next) => {
        try{
            const user_id = req.user.id;
            const idOrder= req.params.id;
            const order = await orders.findOne({
                where: {
                    id: idOrder,
                    user_id: user_id
                },
                include: [
                    {
                        model: users
                    },
                    {
                        model: products
                    }
                ]
            });
            if(!order){
                res.status(404).json({
                    status: 'Failed',
                    message: 'Data Not Found'
                });
                return;
            }
            res.status(200).json({
                status: 'success',
                order
            })
        }
        catch(error){
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }
    // handle update status order
    handleUpdateStatusOrder = async (req, res, next) => {
        try{
            const idOrder = req.params.id;
            const status = req.body.status;
            const order = await orders.findOne({
                where: {
                    id: idOrder
                }
            });
            if(!order){
                res.status(404).json({
                    status: 'success',
                    message: 'Data Not Found'
                });
                return;
            }
            order.status = status;
            await order.save();
            res.status(200).json({
                status: 'success',
                message: 'Update status order success'
            })
        }
        catch(error){
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }
    // 
}
module.exports = OrderController;