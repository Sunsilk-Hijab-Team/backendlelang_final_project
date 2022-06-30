const ApplicationController = require('./ApplicationController');
// include model products

class ProductController extends ApplicationController{
    // function to handleGetAll data product
    handleGetAll(req, res){
        const { Product } = this.models;
        Product.findAll()
        .then(products => {
            res.status(200).json({
                message: "Success get all product",
                data: products
            });
        }
        ).catch(err => {
            res.status(500).json({
                message: "Error get all product",
                data: err
            });
        }
    )}
}