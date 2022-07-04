const { Products } = require('../../../models');
const ApplicationController = require('./ApplicationController');

class ProductBuyerController extends ApplicationController{

    handleGetAll = async (req,res) => {
        try {
            const product = await Products.findAll();
            
            if(product == ""){
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
                    name: "Error",
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
                }
            });

            if (product === null) {
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
    

