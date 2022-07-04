const { orders } = require ('../../../models')
const ApplicationController = require('./ApplicationController');

class OrderBuyerController extends ApplicationController{
    
    handleAddOrder = async(req,res) =>{
        try {
            const bid_price = req.body.bid_price;
            

        } catch (error) {
            
        }
    }
}