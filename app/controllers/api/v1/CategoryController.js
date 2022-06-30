const ApplicationController = require('./ApplicationController');
const { categories } = require('../../../models');
class CategoryController extends ApplicationController{

    handleAdd = async (req, res, next) => {
        try {
            const name = req.body.name
            const category = await categories.create({
                name: name,
                slug: name.toLowerCase()
            });
            res.status(201).json({
                status: 'created',
                category
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong - Ini add category routes'
            });
        }
    }

    handleUpdate = async (req, res, next) => {
        try {
            const name = req.body.name
            const updatedCategory = await category.update({
                name: name,
                slug: name.toLowerCase(),
                where :{
                    id: req.params.id
                }
            })
            res.status(200).json({
                status: 'success',
                category: updatedCategory
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }

    handleList = async (req, res, next) => {
        try {
                const categories = await categories.findAll();
                if(categories == null){
                    res.status(204).json({
                        message: 'No content'
                    });
                    return
                }
                res.status(200).json({
                    status: 'success',
                    categories
                })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            })
        }
    }

    handleGetById = async (req, res, next) => {
        try {

            const category = await categories.findOne(req.params.id);

            if(req.params.id == null){
                res.status(409).json({
                    message: 'Invalid params id'
                });
                return
            }

            res.status(200).json({
                status: 'success',
                data: category
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong'
            })
        }
    }

    handleDelete = async (req, res, next) => {
        try {
            const category = await categories.destroy({
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
                message: 'Something went wrong'
            })
        }
    }

}

module.exports = CategoryController;