const ApplicationController = require('./ApplicationController');
const Slug = require('../../../helpers/slug');
const { Categories } = require('../../../models');
class CategoryController extends ApplicationController{

    handleAdd = async (req, res, next) => {
        try {
            const name = req.body.name
            const slug = Slug.generateSlug(name)

            const existingCategory = await Categories.findOne({ where: { slug: slug } })

            if(existingCategory){
                res.status(409).json({
                    message: 'Category already exists'
                });
                return;
            }

            const category = await Categories.create({
                name: name,
                slug: slug
            })
            // .catch(err => {
            //     console.log(err);
            // });

            res.status(201).json({
                status: 'created',
                category
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

    handleUpdate = async (req, res, next) => {
        try {
            const name = req.body.name
            const slug = Slug.generateSlug(name)

            const updateCategory = await Categories.update({
                name: name,
                slug: slug,
            },{
                where :{
                    id: req.params.id
                }
            })

            res.status(200).json({
                status: 'success',
                updateCategory
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            });
        }
    }

    handleList = async (req, res, next) => {
        try {
            const category = await Categories.findAll();

            if(!category){
                res.status(204).json({
                    status: 'success',
                    message: 'No content',
                    categories: category
                })
                return;
            }

            res.status(200).json({
                status: 'success',
                categories: category
            })

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }

    handleGetById = async (req, res, next) => {
        try {
            const category = await Categories.findByPk(req.params.id);

            if(!category){
                res.status(409).json({
                    message: 'Invalid params id'
                });
                return
            }

            res.status(200).json({
                status: 'success',
                category
            });

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }

    handleDelete = async (req, res, next) => {
        try {
            const category = await Categories.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({
                status: 'success',
                category
            });

        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: 'Something went wrong'
            })
        }
    }

}

module.exports = CategoryController;