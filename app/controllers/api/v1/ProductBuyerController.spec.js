const ProductBuyerController = require('./ProductBuyerController');
const { products } = require('../../../models')

describe('ProductBuyerController', () => {

    describe('#handleGetAll', () => {
        it('Should return 200 code and data', async () => {
            
            const product = new products({
                id: 1,
                name: 'Jam Tangan Casio',
                description: 'Jam tangan ini didesain sederhana dengan materi resin yang ringan. Tampilan feminin yang simpel dapat digunakan sehari-hari.',
                base_price: 250000,
                user_id: 1,
                status: 'available',
                category_id: 1,
                deletedAt: null,
            })

            const mockProductModel = {
                findAll : jest.fn().mockReturnValue(product),
            }
            
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const productBuyerController = new ProductBuyerController();

            await productBuyerController.handleGetAll(mockRequest, mockResponse, mockNext)

            expect(mockProductModel.findAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'Success',
                data: {
                    product
                }
            })

        })
        it('Should return 204 code', async () => {
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                message: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const productBuyerController = new ProductBuyerController();

            await productBuyerController.handleGetAll(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(204)
            expect(mockResponse.message).toBeCalledWith({
                status: 'No Content'
            })
        })
    })
    describe('#handleGetById', () => {
        it('Should return 200 code and data', async () => {
            
            const product = new products({
                id: 1,
                name: 'Jam Tangan Casio',
                description: 'Jam tangan ini didesain sederhana dengan materi resin yang ringan. Tampilan feminin yang simpel dapat digunakan sehari-hari.',
                base_price: 250000,
                user_id: 1,
                status: 'available',
                category_id: 1,
                deletedAt: null,
            })

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

            const mockNext = jest.fn()

            const productBuyerController = new ProductBuyerController();

            await productBuyerController.handleGetById(mockRequest, mockResponse, mockNext)

            expect(mockProductModel.findByPk).toHaveBeenCalledWith(mockRequest.params.id)
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
                status: 'ERROR',
                message: 'Invalid params id'
            })
        })
    })
});