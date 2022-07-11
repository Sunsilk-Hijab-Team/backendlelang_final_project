const OrderController = require('./OrderController');
const { Orders, sequelize } = require('../../../models');
const { queryInterface } = sequelize;


beforeAll( async () => {

})

afterAll( async () => {
     await queryInterface.bulkDelete('Orders', null, {});
})

describe('OrderController', () => {

    describe('#handleGetAll', () => {
        it('should return status code 200 and return a order object', async () => {

            const orders = {
                product_id: 1,
                buyer_id: 2,
                bid_price: 90000000,
                status: 'Menunggu Konfirmasi',
                seller_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }

            const mockRequest = {
                body: orders
             }

             const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
             }

            const mockNext = jest.fn()

            const orderController = new OrderController()

            await orderController.handleAdd(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'success',
                data: mockRequest.body
            })

         });

         it('should return status 204 code and message', async () => {

            const mockRequest = {
                body: {}
             }

             const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
             }

            const mockNext = jest.fn()

            const orderController = new OrderController()

            await orderController.handleAdd(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(204)
            expect(mockResponse.json).toBeCalledWith({
                status: 'success',
                message: 'Data not found'
            })

         })

    });

    describe('#handleGetById', () => {

        it('should return status code 200 and return a order object', async () => {

            const buyerData = {
                id: 2,
                full_name: 'Muhammad Agung Hercules',
                image_url: 'https://www.cloud.com/image_profile.png',
                kota: 'Bandung',
                alamat: 'Lorem ipsum dolor sit amet',
                phone: '085788888888',
            }

            const orders = {
                product_id: 1,
                buyer: buyerData,
                bid_price: 90000000,
                status: 'Menunggu Konfirmasi',
                seller_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }

            const mockRequest = {
                params: {
                    id: order.id
                 }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const orderController = new OrderController()

            await orderController.handleGetById(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'success',
                data: mockRequest.body
            })

        });

           it('Should return 422 code ( Invalid params id ) and message', async () => {

                const mockRequest = {
                    params: {
                        id: '',
                    }
                }

                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const mockNext = jest.fn()

                const orderController = new OrderController()

                await orderController.handleGetById(mockRequest, mockResponse, mockNext)

                expect(mockResponse.status).toBeCalledWith(422)

                expect(mockResponse.json).toBeCalledWith({
                    status: 'error',
                    message: 'Invalid params id'
                })
           })

    });

    describe('#handleOrderConfirmastion', () => {

        it('should return status code 200 and return a order object', async () => {

            const orders = {
                id: 1,
                status: 'Terima'
            }

            const mockRequest = {
                params: {
                    id: order.id
                },
                body: orders
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            const mockNext = jest.fn()

            const orderController = new OrderController()

            await orderController.handleOrderConfirmation(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'success',
                message: 'Order has been confirmed',
                data: [
                    1
                ]
            })

        })

    });

    describe('#handleProductUpdateStatus', () => {

        it('should return status code 200 and return a order object', async () => {


        })

    })

});