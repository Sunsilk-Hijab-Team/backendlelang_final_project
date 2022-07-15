const OrderBuyerController = require('./OrderBuyerController')
const { Products, Categories, Images, Users, Orders, Notifications } = require('../../../models')

beforeAll( async () => {

})
    
afterAll( async () => {
    // await queryInterface.bulkDelete('Orders', null, {});
})
describe('OrderBuyerController', () => {
    
    describe('#handleAddOrder', () => {
        it('should return 201 status code and data order', async () => {

            const order = new Orders({
                id: 1,
                product_id: "PRD-058WMQ0zwdkYo",
                buyer_id: 1,
                bid_price: 200000,
                status: "pending",
                seller_id: 1
            })

            const notification = new Notifications({
                order_id: 1,
                read_status: 'unread',
                receiver_id: 2,
                transaction_date: new Date(),
            })

            const mockRequest = {
                body: {
                    product_id: "PRD-058WMQ0zwdkYo",
                    buyer_id: 1,
                    bid_price: 200000,
                    status: 'pending',
                    seller_id: 1
                    
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleAddOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toHaveBeenCalledWith(201)
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'Created Success',
                data: {
                    order,
                    notification
                }
            })

        })
        it('should return 500 status code and error', async () => {

            const mockRequest = {
                body: {
                    bid_price: 200000
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleAddOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(500)
            expect(mockResponse.json).toBeCalledWith({
                status: 'ERROR',
                message: 'Something went wrong'
            })

        })
    })
    describe('#handleUpdateOrder', () => {
        it('should return 201 status code and data order', async () => {

            const order = new Orders({
                id: 1,
                product_id: "PRD-058WMQ0zwdkYo",
                buyer_id: 1,
                bid_price: 200000,
                status: "pending",
                seller_id: 1
            }) 

            const mockRequest = {
                params: {
                    id: 1
                },
                body: {
                    bid_price: 200000,
                    status: 'pending'
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleUpdateOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(mockResponse.json).toHaveBeenCalledWith({
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

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleUpdateOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(400)
            expect(mockResponse.json).toBeCalledWith({
                status: 'ERROR',
                message: 'Bad Request'
            })

        })
    })
    describe('#handleGetAll', () => {
        it('should return 204 status code ', async () => {
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(204)
        }) 
        it('should return 200 status code and data order', async () => {
            const orders = new Orders({
                id: 1,
                product_id: 'PRD-058WMQ0zwdkYo',
                buyer_id: 1,
                bid_price: 200000,
                status: "pending",
                seller_id: 1
            })

            const order = Orders.findAll(); 

            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toBeDefined()
        })  
        it('should return 500 status code and error', async () => {
            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleGetAll(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(500)
            expect(mockResponse.json).toBeCalledWith({
                error: {
                    status: "ERROR",
                    message: "Something wrong"
                }
            })
        })
    })
    describe('#handleGetById', () => {
        it('should return 201 status code and data order', async () => {

            const orders = new Orders({
                id: 1,
                product_id: "PRD-058WMQ0zwdkYo",
                buyer_id: 1,
                bid_price: 200000,
                status: "pending",
                seller_id: 1
            })
            
            const id = 1;

            const order = await Orders.findByPk(id);

            const mockRequest = {
                params: {
                    id: 1,
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleGetById(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200);
            expect(mockResponse.json).toBeDefined()

        })
        it('should return 204 status code and error', async () => {

            const mockRequest = {
                params: {
                    id: 2,
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleGetById(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(204)
            expect(mockResponse.json).toBeCalledWith()
            
        })
        it('should return 422 status code and error', async () => {

            const mockRequest = {};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const orderBuyerController = new OrderBuyerController();

            await orderBuyerController.handleGetById(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(422)
            expect(mockResponse.json).toBeCalledWith({
                error: {
                    status: "ERROR",
                    message: 'Invalid params id'
                  }
            })
            
        })
    })
    

})
