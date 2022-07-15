const { Products, Categories, Users, Images } = require('../../../models');
const ApplicationController = require('./ApplicationController');

class ProductBuyerController extends ApplicationController{

    handleGetAll = async (req,res) => {
        try {
            const product = await Products.findAll({
                where:{
                    status: 'available'
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    {
                        model: Categories, as: 'categories',
                    },
                    {
                        model: Users, as: 'users'
                    },
                    {
                        model: Images, as: 'images'
                    }
                ]
            });
            
            if(product == "" || product == null){
                res.status(204).json()
            }
            else{
                res.status(200).json({
                    status: "Success",
                    data: {
                        product,
                    }
                })
            }
            
        } catch (err) {
            res.status(500).json({
                error: {
                    status: "Error",
                    message: "Something wrong"
                }
        })
        }
        
    }
    
    handleGetById = async (req, res) => {
        try {
            const product = await Products.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Categories, as: 'categories',
                    },
                    {
                        model: Users, as: 'users'
                    },
                    {
                        model: Images, as: 'images'
                    }
                ]
            });

            if (product === null || product == "") {
                res.status(204).json()
            }
            else{
                res.status(200).json({
                    status: "Success",
                    data: {
                        product,
                    }
                })
            }
    
        } catch (err) {
            res.status(422).json({
                error: {
                  status: "Error",
                  message: 'Invalid params id'
                }
            })
            
        }
    }
}

module.exports = ProductBuyerController;
    

