const ApplicationController = require('./ApplicationController');
const { product, images } = require('../../../models');
const { create } = require('./post');

class ProductController extends ApplicationController{

    handleAdd = async (req, res, next) => {

        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.base_pric;
        const status = req.body.status;
        const category = req.body.categories_id;

        //add images
        const images = req.body.image_url;
        const product_id = req.body.product_id;

        const products = await product.create({
            name: name,
            description: description,
            base_price: price,
            user_id: req.body.user_id,
            status: status,
            categories_id: category
        });

        const image = await images.create({
            image_url: images,
            product_id: product_id
        });




    }

}