// const ApplicationController = require('./ApplicationController');
// const { Products } = require('../../../models');
// const { Images } = require('../../../models');
// const { Categories } = require('../../../models');
// const generateId = require('../../../helpers/productId');
// class ProductController extends ApplicationController{

//     handleAdd = async (req, res, next) => {
//         try{
//             const { count, row } = await Products.findAndCountAll({ where: { deletedAt: null } });
//             const g = generateId.generate(1, 100);

//             const id = 'PRD-' + count + g;
//             const name = req.body.name;
//             const description = req.body.description;
//             const price = req.body.base_price;
//             const status = req.body.status;
//             const published = req.body.published;
//             const category = req.body.categories_id;

//             //add Images
//             const image_url = req.body.image_url;

//             const product = await Products.create({
//                 id: id,
//                 name: name,
//                 description: description,
//                 base_price: price,
//                 user_id: req.user.id,
//                 status: status,
//                 published: published,
//                 categories_id: category
//             });

//             const image = await Images.bulkCreate([
//                 {
//                     image_url: image_url,
//                     product_id: id
//                 },
//                 {
//                     image_url: image_url,
//                     product_id: id
//                 },
//                 {
//                     image_url: image_url,
//                     product_id: id
//                 }
//             ]);

//             res.status(201).json({
//                 status: 'created',
//                 product: {
//                     product,
//                     image
//                 }
//             });

//         } catch (error) {
//             res.status(500).json({
//                 error: error.message,
//                 message: 'Something went wrong'
//             });
//         }

//     }
//     handleGetAll = async (req, res, next) => {
//         try {
//             const product = await Products.findAll({
//                 where: {
//                     user_id: req.user.id,
//                 },
//                 order_by: [
//                     ['createdAt', 'DESC']
//                 ]
//             });

//             // const image = await Images.findByPk();

//             if(!product){
//                 res.status(204).json({
//                     status: 'success',
//                     message: 'No content'
//                 });
//                 return;
//             }

//             res.status(200).json({
//                 status: 'success',
//                 product: {
//                     product,
//                     //image
//                 }
//             })

//         } catch (error) {
//             res.status(500).json({
//                 error: error.message,
//                 message: 'Something went wrong'
//             });
//         }
//     }

//     handleDelete = async (req, res, next) => {
//         try {
//             const product = await Products.destroy({
//                 where: {
//                     id: req.params.id
//                 }
//             });

//             let image = await Images.destroy({
//                 where: {
//                     product_id: req.params.id,
//                 }
//             });

//             res.status(200).json({
//                 status: 'success',
//                 message: {
//                     product,
//                     image
//                 }
//             });
//         } catch (error) {
//             res.status(500).json({
//                 error: error.message,
//                 message: 'Something went wrong'
//             });
//         }
//     }

//     handleUpdate = async (req, res, next) => {
//         try {

//             const name = req.body.name;
//             const description = req.body.description;
//             const price = req.body.base_price;
//             const status = req.body.status;
//             const published = req.body.published;
//             const category = req.body.categories_id;

//              const product = await Products.update({
//                 name: name,
//                 description: description,
//                 base_price: price,
//                 user_id: req.user.id,
//                 status: status,
//                 published: published,
//                 categories_id: category,
//                 }, {
//                     where: {
//                         id: req.params.id
//                     }
//                 });

//             res.status(200).json({
//                 status: 'success',
//                 product
//             })

//         } catch (error) {
//             res.status(500).json({
//                 error: error.message,
//                 message: 'Something went wrong'
//             })
//         }
//     }

//     hadleGetById = async (req, res, next) => {
//         try {
//             const product = await Products.findByPk(req.params.id);

//             const image = await Images.findAll({
//                 where: {
//                     product_id: req.params.id
//                 }
//             });

//             if(!product){
//                 res.status(409).json({
//                     status: 'success',
//                     message: 'Invalid params id'
//                 });
//                 return;
//             }

//             res.status(200).json({
//                 status: 'success',
//                 product: {
//                     product,
//                     image
//                 }
//             })

//         } catch (error) {
//             res.status(500).json({
//                 error: error.message,
//                 message: 'Something went wrong'
//             });
//         }
//     }

//     handleUpdateStatus = async (req, res, next) => {
//         try {

//             const status = req.body.status;

//             const product = await Products.update({
//                 status: status
//             }, {
//                 where: {
//                     id: req.params.id
//                 }
//             });

//             if(!product){
//                 res.status(409).json({
//                     status: 'success',
//                     message: 'Invalid params id'
//                 });
//                 return;
//             }

//             res.status(200).json({
//                 status: 'success',
//                 product
//             })

//         } catch (error) {
//             res.status(500).json({
//                 error: error.message,
//                 message: 'Something went wrong'
//             });
//         }
//     }

//     handleGetStatusSell = async (req, res, next) => {
//         try {

//             const product = await Products.findAll({
//                 where: {
//                     status: 'terjual',
//                     user_id: req.user.id
//                 },
//                 order_by: [
//                     ['createdAt', 'DESC']
//                 ]
//             });

//             if(!product){
//                 res.status(204).json({
//                     status: 'success',
//                     message: 'No content'
//                 });
//                 return;
//             }

//             res.status(200).json({
//                 status: 'success',
//                 product: {
//                     product
//                 }
//             })

//         } catch (error) {
//             res.status(500).json({
//                 error: error.message,
//                 message: 'Something went wrong'
//             });
//         }
//     }

//     handleGetByCategory = async (req, res, next) => {
//         try {
//             const category = await Categories.findOne({
//                 where: {
//                     slug: req.query.slug
//                 }
//             })

//             const product = await Products.findAll({
//                 where: {
//                     categories_id: category.id,
//                 }
//             });

//             res.status(200).json({
//                 status: 'success',
//                 data: {
//                     category,
//                     product
//                 }
//             });

//         } catch (error) {

//             res.status(500).json({
//                 error: error.message,
//                 message: 'Something went wrong'
//             });

//         }
//     }

// }


// module.exports = ProductController