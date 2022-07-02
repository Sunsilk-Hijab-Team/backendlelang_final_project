const ApplicationController = require('./ApplicationController');
const { Products } = require('../../../models');
const { Images, Users } = require('../../../models');
const { Categories } = require('../../../models');
const generateId = require('../../../helpers/productId');
const { Op } = require("sequelize");
class ProductController extends ApplicationController{

    handleAdd = async (req, res, next) => {
        try{
            const { count, row } = await Products.findAndCountAll({ where: { deletedAt: null } });
            const g = generateId.generate(1, 100);

            const id = 'PRD-' + count + g;
            const name = req.body.name;
            const description = req.body.description;
            const price = req.body.base_price;
            const status = req.body.status;
            const published = req.body.published;
            const category = req.body.categories_id;

            //add Images
            const image_url = req.body.image_url;

            const product = await Products.create({
                id: id,
                name: name,
                description: description,
                base_price: price,
                user_id: req.user.id,
                status: status,
                published: published,
                categories_id: category
            });

            const image = await Images.bulkCreate([
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
                status: 'Created Success',
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
            const product = await Products.findAll({
                where: {
                    user_id: req.user.id,
                },
                order_by: [
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

            if(product == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }

            res.status(200).json({
                status: 'Success',
                product
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
            const product = await Products.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            });

            let image = await Images.destroy({
                where: {
                    product_id: req.params.id,
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

    handleUpdate = async (req, res, next) => {
        try {

            const name = req.body.name;
            const description = req.body.description;
            const price = req.body.base_price;
            const status = req.body.status;
            const published = req.body.published;
            const category = req.body.categories_id;

             const product = await Products.update({
                name: name,
                description: description,
                base_price: price,
                user_id: req.user.id,
                status: status,
                published: published,
                categories_id: category,
                }, {
                    where: {
                        id: req.params.id,
                        user_id: req.user.id
                    }
                });

            res.status(200).json({
                status: 'Update Success',
                product
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }

    hadleGetById = async (req, res, next) => {
        try {
            const product = await Products.findByPk(req.params.id,{
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

            if(product == ""){
                res.status(409).json({
                    status: 'Error',
                    message: 'Invalid params id'
                });
                return;
            }

            res.status(200).json({
                status: 'Success',
                product
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

    handleUpdateStatus = async (req, res, next) => {
        try {

            const status = req.body.status;

            const product = await Products.update({
                status: status
            }, {
                where: {
                    id: req.params.id
                }
            });

            if(!product){
                res.status(409).json({
                    status: 'Error',
                    message: 'Invalid params id'
                });
                return;
            }

            res.status(200).json({
                status: 'Updated Success',
                product
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

    handleGetStatusSell = async (req, res, next) => {
        try {

            const product = await Products.findAll({
                where: {
                    status: 'terjual',
                    user_id: req.user.id
                },
                order_by: [
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

            if(product == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return;
            }

            res.status(200).json({
                status: 'Success',
                product: {
                    product
                }
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

    handleGetByCategory = async (req, res, next) => {
        try {
            const categories = await Categories.findOne({
                where: {
                    slug: req.query.slug
                },
                include: [
                    {
                        model: Products, as: 'products',
                        include: [
                            {
                                model: Users, as: 'users'
                            },
                            {
                                model: Images, as: 'images'
                            }
                        ]
                    }
                ]
            })

            if(categories == null){
                res.status(409).json({
                    status: 'Error',
                    message: 'Invalid params category'
                });
                return;
            }

            res.status(200).json({
                status: 'success',
                categories
            });

        } catch (error) {

            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });

        }
    }

    handleSearch = async (req, res, next) => {
        try {
            const result = await Products.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                },
                include: [
                    {
                        model: Categories, as: 'categories',
                    },
                    {
                        model: Images, as: 'images'
                    },
                    {
                        model: Users, as: 'users'
                    }
                ]
            });

            if(result == ""){
                res.status(204).json({
                    status: 'Success',
                    message: 'No content'
                });
                return
            }

            res.status(200).json({
                status: "Success",
                result
            })

        } catch (error) {

        }
    }

}


module.exports = ProductController