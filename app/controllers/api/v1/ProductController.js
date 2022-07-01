const ApplicationController = require('./ApplicationController');
const { products } = require('../../../models');
const { images } = require('../../../models');
const generateId = require('../../../helpers/productId');
class ProductController extends ApplicationController{

    handleAdd = async (req, res, next) => {
        try{
            const { count, row } = await products.findAndCountAll({ where: { deletedAt: null } });
            const g = generateId.generate(1, 100);

            const id = 'PRD-' + count + g;
            const name = req.body.name;
            const description = req.body.description;
            const price = req.body.base_price;
            const status = req.body.status;
            const published = req.body.published;
            const category = req.body.categories_id;

            //add images
            const image_url = req.body.image_url;

            const product = await products.create({
                id: id,
                name: name,
                description: description,
                base_price: price,
                user_id: req.user.id,
                status: status,
                published: published,
                categories_id: category
            });

            const image = await images.bulkCreate([
                {
                    image_url: image_url,
                    product_id: id
                },
                {
                    image_url: image_url,
                    product_id: id
                },
                {
                    image_url: image_url,
                    product_id: id
                }
            ]);

            res.status(201).json({
                status: 'created',
                product: {
                    product,
                    image
                }
            });

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }

    }
    handleGetAll = async (req, res, next) => {
        try {
            const product = await products.findAll({
                where: {
                    user_id: req.user.id,
                },
                order_by: [
                    ['createdAt', 'DESC']
                ]
            });

            // const image = await images.findByPk();

            if(!product){
                res.status(204).json({
                    status: 'success',
                    message: 'No content'
                });
                return;
            }

            res.status(200).json({
                status: 'success',
                product: {
                    product,
                    //image
                }
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

    handleDelete = async (req, res, next) => {
        try {
            const product = await products.destroy({
                where: {
                    id: req.params.id
                }
            });

            let image = await images.destroy({
                where: {
                    product_id: req.params.id
                }
            });

            res.status(200).json({
                status: 'success',
                message: {
                    product,
                    image
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

    

}


module.exports = ProductController