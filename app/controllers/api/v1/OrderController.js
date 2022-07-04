const ApplicationController = require('./ApplicationController');
//import model users, product
const { Orders, Products, Categories, Users } = require('../../../models');

class OrderController extends ApplicationController{

    handleGetAll = async (req, res, next) => {
        try {
            const getOrders = await Orders.findAll({
            where: {
                    seller_id: req.user.id
                },
                include: [
                    {
                        model: Products, as: 'products',
                        include: [
                            {
                                model: Categories, as: 'categories'
                            }
                        ]
                    },
                    {
                        model: Users, as: 'users_buyer',
                    },
                    {
                        model: Users, as: 'users_seller',
                    }
                ]
            });

            if(getOrders == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }

            res.status(200).json({
                status: 'Success',
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
            const getOrderById = await Orders.findByPk(req.params.id, {
                include: [
                    {
                        model: Products, as: 'products',
                        include: [
                            {
                                model: Categories, as: 'categories'
                            }
                        ]
                    },
                    {
                        model: Users, as: 'users_buyer',
                    },
                    {
                        model: Users, as: 'users_seller',
                    }
                ]
            });

            if(!getOrderById){
                res.status(409).json({
                    message: 'Invalid params id'
                });
                return
            }

            res.status(200).json({
                status: 'Success',
                getOrderById
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