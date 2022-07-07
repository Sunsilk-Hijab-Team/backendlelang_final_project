const ApplicationController = require('./ApplicationController');
//import model Users, product
const { Users, Orders, Notifications, Products} = require('../../../models');

class NotificationController extends ApplicationController{
    // get all data notification where user login
    handleGetAllNotification = async (req, res, next) => {
        // console.log("req user oiii : "+req.user.id+"----------");
        try {
            const getNotifications = await Notifications.findAll({
            where: {
                    receiver_id: req.user.id
                },
                include: [
                    {
                        model: Orders, as: 'orders',
                        // include model products & users
                        include: [
                            {
                                model: Users, as: 'users_buyer',
                            },
                            {
                                model: Users, as: 'users_seller',
                            },
                            {
                                model: Products, as: 'products',
                            }
                        ]

                    }
                ],
                getNotifications: [
                    ['createdAt', 'DESC']
                ]
            });
            // console.log("---- notification coy --------"+getNotifications+"--------");

            if(getNotifications == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }

            res.status(200).json({
                status: 'Success',
                Notifications: getNotifications
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }
    // get data notification user login where id notification=params id
    handleGetNotificationById = async (req, res, next) => {
        try {
            const getNotificationById = await Notifications.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Orders, as: 'orders',
                        // include model products & users
                        include: [
                            {
                                model: Users, as: 'users_buyer',
                            },
                            {
                                model: Users, as: 'users_seller',
                            },
                            {
                                model: Products, as: 'products',
                            }
                        ]

                    }
                ]
            });
            if(getNotificationById == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }
            res.status(200).json({
                status: 'Success',
                Notification: getNotificationById
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }
    // handle update notification read status where id notification=params id
    handleUpdateNotificationReadStatus = async (req, res, next) => {
        try {
            const updateNotificationReadStatus = await Notifications.update({
                read_status: "read"
            }, {
                where: {
                    id: req.params.id
                }
            });
            if(updateNotificationReadStatus == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }
            res.status(200).json({
                status: 'Success',
                Notification: updateNotificationReadStatus
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }
}

module.exports = NotificationController;