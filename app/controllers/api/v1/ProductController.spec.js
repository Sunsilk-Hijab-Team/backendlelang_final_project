const ProductController = require('./ProductController');

beforeAll( async () => {

})

afterAll( async () => {

})

describe('ProductController', () => {

    describe('#handleAdd', () => {

        it('Should return 201 code and message', async () => {

            const product = {
                id: 1,
                name: 'Jam Tangan',
                description: 'Lorem ipsum dolor sit amet',
                base_price: '1000000',
                user_id: 1,
                status: 'Tersedia',
                category_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }

            const mockRequest = { body: product }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const productController = new ProductController();

            await productController.handleAdd(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(201)

            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                message: 'Product added successfully',
            })

        });

    });

    describe('#handleUpdate', () => {

            it('Should return 200 code and message', async () => {

                const product = {
                id: 1,
                name: 'Jam Tangan Rolex',
                description: 'Lorem ipsum dolor sit amet',
                base_price: '100000000',
                user_id: 1,
                status: 'Terjual',
                category_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }

            const mockRequest = {

                params: {
                    id: category.id
                },

                body: product
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const productController = new ProductController();

            await productController.handleUpdate(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200)

            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                message: 'Product updated successfully',
            })

        })

        it('Should return 422 code ( Invalid params id ) and message', async () => {

            const product = {
                 name: 'Jam Tangan Rolex',
                description: 'Lorem ipsum dolor sit amet',
                base_price: '100000000',
                user_id: 1,
                status: 'Terjual',
                category_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }

            const mockRequest = {
                id: {

                },

                body: product
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const productController = new ProductController();

            await productController.handleUpdate(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(422)

            expect(mockResponse.json).toBeCalledWith({
                status: 'ERROR',
                message: 'Invalid params id',
            })

        });

    });




});