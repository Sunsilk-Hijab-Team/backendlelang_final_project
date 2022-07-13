const ProductController = require('./ProductController');
const { Users, sequelize, Products, Categories, Images } = require('../../../models');
const { queryInterface } = sequelize;
const generateId = require('../../../helpers/productId');


beforeAll( async () => {
})

afterAll( async () => {
    await queryInterface.bulkDelete('Products', null, {});
})

describe('ProductController', () => {

    describe('#handleAdd', () => {

        it('Should return 201 code and message', async () => {

            // const { count, row } = await Products.findAndCountAll({ where: { deletedAt: null } });
            // const g = generateId.generate(1, 100);
            // const id = 'PRD-' + count + g;

            const product = new Products({
                id: 1,
                name: 'Jam Tangan',
                description: 'Lorem ipsum dolor sit amet',
                base_price: '1000000',
                user_id: 1,
                status: 'Tersedia',
                published: true,
                category_id: 1,
                deletedAt: null
            })

            // const file =
            //     {
            //         fieldname: 'image_url',
            //         originalname: '14.png',
            //         encoding: '7bit',
            //         mimetype: 'image/png',
            //         buffer: '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 08 70 00 00 08 70 08 06 00 00 00 4f cc 5b 69 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 09 ... 27946 more bytes>',
            //         size: 27996
            //     }
                //,
                // {
                //     fieldname: 'image_url',
                //     originalname: '15.png',
                //     encoding: '7bit',
                //     mimetype: 'image/png',
                //     buffer: '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 08 70 00 00 08 70 08 06 00 00 00 4f cc 5b 69 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 09 ... 473332 more bytes>',
                //     size: 473382
                // }

            // const fileBase64 = file.buffer.toString('base64');
            // const filess = `data:${file.mimetype};base64,${fileBase64}`;


            const mockRequest = { body: product }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

             const mockModel = {
                create: jest.fn().mockReturnValue(product)
            }

            const mockNext = jest.fn()

            const productController = new ProductController({
                 productModel: mockModel
            });

            await productController.handleAdd(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(201)
            expect(mockResponse.json).toBeDefined()
            // expect(mockResponse.json).toHaveBeenCalledWith({
            //     status: 'Success',
            //     product
            // })

        });

    });

    // describe('#handleUpdate', () => {

    //         it('Should return 200 code and message', async () => {

    //             const product = {
    //             id: 1,
    //             name: 'Jam Tangan Rolex',
    //             description: 'Lorem ipsum dolor sit amet',
    //             base_price: '100000000',
    //             user_id: 1,
    //             status: 'Terjual',
    //             category_id: 1,
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             deletedAt: null
    //         }

    //         const mockRequest = {

    //             params: {
    //                 id: product.id
    //             },

    //             body: product
    //         }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext = jest.fn()

    //         const productController = new ProductController();

    //         await productController.handleUpdate(mockRequest, mockResponse, mockNext)

    //         expect(mockResponse.status).toHaveBeenCalledWith(200)

    //         expect(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'SUCCESS',
    //             message: 'Product updated successfully',
    //         })

    //     })

    //     it('Should return 422 code ( Invalid params id ) and message', async () => {

    //         const product = {
    //             name: 'Jam Tangan Rolex',
    //             description: 'Lorem ipsum dolor sit amet',
    //             base_price: '100000000',
    //             user_id: 1,
    //             status: 'Terjual',
    //             category_id: 1,
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             deletedAt: null
    //         }

    //         const mockRequest = {
    //             params: {

    //             },

    //             body: product
    //         }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext = jest.fn()

    //         const productController = new ProductController();

    //         await productController.handleUpdate(mockRequest, mockResponse, mockNext)

    //         expect(mockResponse.status).toHaveBeenCalledWith(422)

    //         expect(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'ERROR',
    //             message: 'Invalid params id',
    //         })

    //     });

    // });

    // describe('#handleDelete', () => {

    //     it('Should return 200 code and message', async () => {

    //             const product = {
    //                 id: 1,
    //             }

    //             const mockRequest = {
    //                 params: {
    //                     id: product.id
    //                 }
    //             }

    //             const mockResponse = {
    //                 status: jest.fn().mockReturnThis(),
    //                 json: jest.fn().mockReturnThis()
    //             }

    //             const mockNext = jest.fn()

    //             const productController = new ProductController();

    //             await productController.handleDelete(mockRequest, mockResponse, mockNext)

    //             expect(mockResponse.status).toHaveBeenCalledWith(200)
    //             expect(mockResponse.json).toHaveBeenCalledWith({
    //                 status: 'SUCCESS',
    //                 message: 'Product deleted successfully',
    //             })
    //     });

    //     it('Should return 422 code ( Invalid params id ) and message', async () => {

    //         const mockRequest = {
    //             params: {

    //             }
    //         }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext = jest.fn()

    //         const productController = new ProductController();

    //         await productController.handleDelete(mockRequest, mockResponse, mockNext)

    //         expect(mockResponse.status).toHaveBeenCalledWith(422)
    //         expect(mockResponse.josn).toHaveBeenCalledWith({
    //             status: 'ERROR',
    //             message: 'Invalid params id',
    //         });
    //     })

    // });

    describe('#handleGetAll', () => {

        it('Should return 200 code and message', async () => {

            const Product = new Products  ({
                id: 1,
                name: 'Jam Tangan Rolex',
                description: 'Lorem ipsum dolor sit amet',
                base_price: '100000000',
                user_id: 1,
                status: 'terjual',
                published: true,
                category_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            })

            const product = await Products.findAll( );

            const mockRequest = {   }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const productController = new ProductController();

            await productController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeDefined()
            // expect(mockResponse.json).toHaveBeenCalledWith({
            //     status: 'Success',
            //     product
            // })

        });

        it('Should return 204 code and messages', () => {

            const mockRequest = {   }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const productController = new ProductController();

            productController.handleGetAll(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(204)
              expect(mockResponse.json).toBeDefined()
            // expect(mockResponse.json).toHaveBeenCalledWith({
            //     status: 'Success',
            //     message: 'No data found',
            //     data: {

            //     }
            // })
        })

    });


    // describe('#handleGetById', () => {

    //     it('Should return 200 code and message', async () => {
    //         const product =  {
    //             id: 1,
    //             name: 'Jam Tangan Rolex',
    //             description: 'Lorem ipsum dolor sit amet',
    //             base_price: '100000000',
    //             user_id: 1,
    //             status: 'Terjual',
    //             category_id: 1,
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             deletedAt: null
    //         }

    //         const mockRequest = {
    //             params: {
    //                 id: product.id
    //             }
    //          }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext= json.fn();

    //         const productController = new ProductController();

    //         await productController.handleGetById(mockRequest, mockResponse, mockNext);

    //         expect(mockResponse.status).toHaveBeenCalledWith(200)
    //         expect(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'SUCCESS',
    //             message: 'Product retrieved successfully',
    //             data: {
    //                 product
    //             }
    //         });
    //     })

    //     it('Should return 204 code and message', async () => {

    //         const product = {
    //             id: 2,
    //         }

    //         const mockRequest = {
    //             params: {
    //                 id: product.id
    //             }
    //         }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext = jest.fn()

    //         const productController = new ProductController();

    //         await productController.handleGetById(mockRequest, mockResponse, mockNext)

    //         expect(mockResponse.status).toHaveBeenCalledWith(204)

    //         expect(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'SUCCESS',
    //             message: 'No data found',
    //             data: {

    //             }
    //         })

    //     })

    //     it('Should return 422 code ( Invalid params id ) and message', async () => {

    //             const mockRequest = {
    //                 params: {

    //                 }
    //              }

    //             const mockResponse = {
    //                 status: jest.fn().mockReturnThis(),
    //                 json: jest.fn().mockReturnThis()
    //             }

    //             const mockNext = jest.fn()

    //             const productController = new ProductController();

    //             await productController.handleGetById(mockRequest, mockResponse, mockNext)

    //             expect(mockResponse.status).toHaveBeenCalledWith(422)

    //             expect(mockResponse.json).toHaveBeenCalledWith({
    //                 status: 'ERROR',
    //                 message: 'Invalid params id',
    //             })

    //         })

    // });

    // describe('#handleUpdateProductStatus', () => {

    //     it('Shoult return 200 code and message', async () => {

    //         const product = {
    //             id: 1,
    //             status: 'terjual'
    //         }

    //         const mockRequest = {
    //             params: {
    //                 id: product.id
    //             }
    //         }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext = jest.fn()

    //         const productController = new ProductController();

    //         await productController.handleUpdateProductStatus(mockRequest, mockResponse, mockNext)

    //         expect(mockResponse.status).toHaveBeenCalledWith(200)

    //         expect(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'SUCCESS',
    //             message: 'Product status updated successfully',
    //             data: [
    //                 1
    //             ]
    //         })
    //     })

    //     it('Should return 422 code ( Invalid params id ) and message', async () => {

    //         const mockRequest = {
    //             params: {

    //             }
    //         }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext = jest.fn()

    //         const productController = new ProductController();

    //         await productController.handleUpdateProductStatus(mockRequest, mockResponse, mockNext)

    //         expect(mockResponse.status).toHaveBeenCalledWith(422)
    //         expexct(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'ERROR',
    //             message: 'Invalid params id',
    //         })
    //     })

    // });

    // describe('#handleGetByStatus', () => {

    //     it('Should return 200 code and message', async () => {

    //         const product = {
    //             id: 1,
    //             name: 'Jam Tangan Rolex',
    //             description: 'Lorem ipsum dolor sit amet',
    //             base_price: '100000000',
    //             user_id: 1,
    //             status: 'Terjual',
    //             category_id: 1,
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             deletedAt: null
    //         }

    //         const mockRequest = {  }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext = jest.fn()

    //         const productController = new ProductController(productModel);

    //         await productController.handleGetByStatus(mockRequest, mockResponse, mockNext)

    //          const expectedResponse = await productModel.findAll({
    //             where:{
    //                 status: 'terjual',
    //                 user_id: 1
    //             }
    //         })

    //         expect(mockResponse.status).toHaveBeenCalledWith(200)
    //         expect(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'SUCCESS',
    //             message: 'Product retrieved successfully',
    //             data: expectedResponse
    //         })

    //     });

    //     it('Should return 204 code and message', async () => {

    //         const mockRequest = {   }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis()
    //         }

    //         const mockNext = jest.fn()

    //         const productController = new ProductController();

    //         await productController.handleGetByStatus(mockRequest, mockResponse, mockNext)

    //         expect(mockResponse.status).toHaveBeenCalledWith(204)
    //         expected(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'SUCCESS',
    //             message: 'No data found',
    //         });

    //     })

    // });

    // describe('#handleGetByCategory', () => {

    //     it('Should return 200 code and message', async () => {

    //             const category = {
    //                 id: 1,
    //                 name: 'Jam Tangan',
    //                 slug: 'jam-tangan',
    //             }

    //             const product = {
    //                 id: 1,
    //                 name: 'Jam Tangan Rolex',
    //                 description: 'Lorem ipsum dolor sit amet',
    //                 base_price: '100000000',
    //                 user_id: 1,
    //                 status: 'Belum Terjual',
    //                 category_id: 1,
    //                 createdAt: new Date(),
    //                 updatedAt: new Date(),
    //                 deletedAt: null
    //             }

    //             const mockRequest = {
    //                 params: {
    //                     slug: category.slug
    //                 }
    //             }

    //             const mockResponse = {
    //                 status: jest.fn().mockReturnThis(),
    //                 json: jest.fn().mockReturnThis()
    //             }

    //             const mockNext = jest.fn()

    //             const productController = new ProductController();

    //             await productController.handleGetByCategory(mockRequest, mockResponse, mockNext)

    //             const categoryData = await categoryModel.findAll({
    //                 where: {
    //                     slug: mockRequest.params
    //                 }
    //             })

    //             const expectedResponse = await productModel.findAll({
    //                 where:{
    //                     category_id: categoryData.id
    //                 }
    //             })

    //             expect(mockResponse.status).toHaveBeenCalledWith(200)
    //             expect(mockResponse.json).toHaveBeenCalledWith({
    //                 status: 'SUCCESS',
    //                 message: 'Product retrieved successfully',
    //                 data: expectedResponse
    //             })
    //     })
    // })


});