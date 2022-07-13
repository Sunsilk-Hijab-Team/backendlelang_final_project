const ApplicationController = require('./ApplicationController');
//import model Users, product
const { Users, Products, Orders, Categories, Notifications } = require('../../../models');

class OrderController extends ApplicationController{
    // get all data order from tabel order join with table Users & Products where id user equal with user login
    handleGetAllOrder = async (req, res, next) => {
        // console.log("req user oiii : "+req.user.id+"----------");
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
                ],
                getOrders: [
                    ['createdAt', 'DESC']
                ]
            });
            // console.log("---- order coy --------"+getOrders+"--------");

            if(getOrders == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }

            res.status(200).json({
                status: 'Success',
                Orders: getOrders
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }
    // get order by id
    handleOrderByid = async (req, res, next) => {
        try {
            // console.log(typeof(req.params.id));
            const getOrderById = await Orders.findOne({
                where:{
                    id: req.params.id,
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

            if(!getOrderById){
                res.status(404).json({
                    message: 'Data Not Found'
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
    // handle update status order
    handleUpdateStatusOrder = async (req, res, next) => {
        try{
            const idOrder = req.params.id;
            const status = req.body.status;
            const order = await Orders.findOne({
                where: {
                    seller_id: req.user.id,
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
            // after order save insert new data into notification table
            const notificationData={
                order_id: order.id,
                read_status: 'unread',
                receiver_id: order.buyer_id,
                transaction_date: order.updatedAt,
            }
            const notification = await Notifications.create(notificationData);
            // send new notification data to buyer user using socket
            const buyerDataNotification = {
                notification: notification,
                user_id: order.buyer_id
            }
            this.io.emit('new-notification', buyerDataNotification);

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