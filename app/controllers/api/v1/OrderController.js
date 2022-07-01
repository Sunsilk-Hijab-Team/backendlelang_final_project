const ApplicationController = require('./ApplicationController');
//import model users, product
const { Orders } = require('../../../models');

class OrderController extends ApplicationController{

    handleGetAll = async (req, res, next) => {
        try {
            const getOrders = await Orders.findAll({
            where: {
                seller_id: req.user.id
            }
            });

            if(!getOrders){
                res.status(204).json({
                    status: 'success',
                    message: 'No content'
                });
                return;
            }

            res.status(200).json({
                status: 'success',
                orders: getOrders
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }

    handleOrderByid = async (req, res, next) => {
        try {
            const getOrderById = await Orders.findByPk(req.params.id);

            if(!getOrderById){
                res.status(409).json({
                    message: 'Invalid params id'
                });
                return
            }

            res.status(200).json({
                status: 'success',
                order: getOrderById
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

}

module.exports = OrderController;