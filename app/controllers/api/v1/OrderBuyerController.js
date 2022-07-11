const { Orders, Products, Users, Categories, Images, Notifications } = require ('../../../models')
const ApplicationController = require('./ApplicationController');

class OrderBuyerController extends ApplicationController{
    
    handleAddOrder = async(req,res) =>{
        try {
            const product_id = req.body.product_id;
            const status = 'pending';
            const bid_price = req.body.bid_price;
            const seller_id = req.body.seller_id;
            
            const order = await Orders.create({
                product_id: product_id,
                buyer_id: req.user.id,
                bid_price: bid_price,
                status: status,
                seller_id: seller_id,
            })

            const notification = await Notifications.create({
                order_id: order.id,
                read_status: 'unread',
                receiver_id: order.seller_id,
                transaction_date: order.createdAt,
            })

            res.status(201).json({
                status: 'Created Success',
                data: {
                    order,
                    notification
                }
            });

        } catch (error) {
            res.status(500).json({
                status: 'ERROR',
                message: 'Something went wrong'
            });
        }
    }

    handleUpdateOrder = async(req,res) => {
        try {
            const bid_price = req.body.bid_price;
            const status = 'pending'
            
            const order = await Orders.update({
                bid_price: bid_price,
                status: status
            },
            {
                where: {
                    id: req.params.id,
                    buyer_id: req.user.id
                }
            });

            res.status(201).json({
                status: 'Update Bid Success',
                data: {
                    order
                }
            });

        } catch (err) {
            res.status(400).json({
                status: 'ERROR',
                message: 'Bad Request'
            })
        }
    }

    handleGetAll = async (req,res) => {
        try {
            const order = await Orders.findAll({
                where:{
                    buyer_id: req.user.id
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    {
                        model: Products, as: 'products',
                        include: [
                            {
                                model: Categories, as: 'categories'
                            },
                            {
                                model: Images, as: 'images'
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
            
            if(order == "" || order === null){
                res.status(204).json()
            }
            else{
                res.status(200).json({
                    status: "Success",
                    data: {
                        order,
                    }
                })
            }
            
        } catch (err) {
            res.status(500).json({
                error: {
                    status: "ERROR",
                    message: "Something wrong"
                }
        })
        }
        
    }

    handleGetById = async (req, res) => {
        try {
            const order = await Orders.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Products, as: 'products',
                    },
                    {
                        model: Users, as: 'users_buyer'
                    },
                    {
                        model: Users, as: 'users_seller'
                    }
                ]
            });

            if (order == "" || order === null) {
                res.status(204).json()
            }
            else{
                res.status(200).json({
                    status: "Success",
                    data: {
                        order,
                    }
                })
            }
    
        } catch (err) {
            res.status(422).json({
                error: {
                  status: "ERROR",
                  message: 'Invalid params id'
                }
            })
            
        }
    }
}

module.exports = OrderBuyerController