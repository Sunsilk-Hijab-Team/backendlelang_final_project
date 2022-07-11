const ProductBuyerController = require('./ProductBuyerController');
const { Products,Categories,Users,Images, sequelize } = require('../../../models')
const { queryInterface } = sequelize;

// beforeAll( async () => {
//     await queryInterface.bulkInsert('Products',[
//         {
//             id: 'PRD-058WMQ0zwdkYO',
//             name: 'Jam Tangan Casio',
//             description: 'Jam tangan ini didesain sederhana dengan materi resin yang ringan. Tampilan feminin yang simpel dapat digunakan sehari-hari.',
//             base_price: 250000,
//             user_id: 1,
//             status: 'available',
//             published: 'published',
//             category_id: 1,
//             deletedAt: null,    
//         }
//     ], {})
// })

// afterAll( async () => {
//     await queryInterface.bulkDelete('Products', null, {
//         truncate: true,
//         restartIdentity: true,
//     });
// })

describe('ProductBuyerController', () => {

    describe('#handleGetAll', () => {
        it('Should return 200 code and data', async () => {
            
            const product = Products.findAll({
                where:{
                    status: 'available'
                },
                order: [
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
            
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const productBuyerController = new ProductBuyerController();

            await productBuyerController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toBeDefined()

        })
        it('Should return 204 code', async () => {
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis()
            }

            const productBuyerController = new ProductBuyerController();

            await productBuyerController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(204)
            expect(mockResponse.json).toBeDefined()
        })
        it('Should return 500 code', async () => {
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const productBuyerController = new ProductBuyerController();

            await productBuyerController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    name: "Error",
                    message: "Something wrong"
                }
            })
        })
    })
    describe('#handleGetById', () => {
        it('Should return 200 code and data', async () => {
            
            const id = 1;

            const product = await Products.findOne(id)

            const mockProductModel = {
                findByPk: jest.fn().mockReturnValue(product)
            }
            
            const mockRequest = {
                params: {
                    id: 1,
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const productBuyerController = new ProductBuyerController();

            await productBuyerController.handleGetById(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                data: {
                    product
                }
            })

        })
        it('Should return 422 status code and message', async () => {
                      
            const mockRequest = {
                params: {
                    id: 1,
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const productBuyerController = new ProductBuyerController();

            await productBuyerController.handleGetById(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(422)
            expect(mockResponse.json).toBeCalledWith({
                error: {
                    status: "Error",
                    message: 'Invalid params id'
                  }
            })
        })
    })
});