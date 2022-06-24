const OrderController = require('./OrderController')

describe('OrderController', () => {
    
    describe('#handleAddOrder', () => {
        it('should return 201 status code and data order', async () => {

            const order = {
                id: 1,
                product_id: 1,
                buyer_id: 1,
                bid_price: 200000,
                status: "menunggu",
                seller_id: 1,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const mockRequest = {
                body: {
                    bid_price: 200000
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderController = new OrderController();

            await orderController.handleAddOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                data: {
                    order
                }
            })

        })
        it('should return 400 status code and error', async () => {

            const mockRequest = {
                body: {
                    bid_price: 200000
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderController = new OrderController();

            await orderController.handleAddOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(400)
            expect(mockResponse.json).toBeCalledWith({
                status: 'ERROR',
                message: 'Bad Request'
            })

        })
    })
    describe('#handleUpdateOrder', () => {
        it('should return 201 status code and data order', async () => {

            const order = {
                id: 1,
                product_id: 1,
                buyer_id: 1,
                bid_price: 200000,
                status: "menunggu",
                seller_id: 1,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const mockRequest = {
                params: {
                    id: 1
                },
                body: {
                    bid_price: 200000
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderController = new OrderController();

            await orderController.handleUpdateOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                data: {
                    order
                }
            })

        })
        it('should return 400 status code and error', async () => {

            const mockRequest = {
                params: {
                    id: 1
                },
                body: {
                    bid_price: 200000
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderController = new OrderController();

            await orderController.handleUpdateOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(400)
            expect(mockResponse.json).toBeCalledWith({
                status: 'ERROR',
                message: 'Bad Request'
            })

        })
    })
    describe('#handleGetAll', () => {
        it('should return 200 status code and data order', async () => {

            const order = {
                id: 1,
                product_id: 1,
                buyer_id: 1,
                bid_price: 200000,
                status: "menunggu",
                seller_id: 1,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderController = new OrderController();

            await orderController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                data: {
                    order
                }
            })
        })
        it('should return 204 status code and error', async () => {
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                message: jest.fn().mockReturnThis()
            }

            const orderController = new OrderController();

            await orderController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(204)
            expect(mockResponse.message).toBeCalledWith({
                status: "No Content"
            })
        })
    })
    describe('#handleGetOrderById', () => {
        it('should return 201 status code and data order', async () => {

            const order = {
                id: 1,
                product_id: 1,
                buyer_id: 1,
                bid_price: 200000,
                status: "menunggu",
                seller_id: 1,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date()
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

            const orderController = new OrderController();

            await orderController.handleGetOrderById(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                data: {
                    order
                }
            })

        })
        it('should return 422 status code and error', async () => {

            const mockRequest = {
                params: {
                    id: 1,
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderController = new OrderController();

            await orderController.handleGetOrderById(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(422)
            expect(mockResponse.json).toBeCalledWith({
                status: 'ERROR',
                message: 'Invalid params id'
            })
            
        })
    })
    

})