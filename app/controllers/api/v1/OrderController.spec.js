const OrderController = require('./OrderController');
const { sequelize, Orders, Products, Users } = require('../../../models');
const { queryInterface } = sequelize;
const authHelper = require('../../../helpers/AuthenticationHelper');

beforeAll( async () => {
    await queryInterface.bulkInsert('Users', [
            {
                full_name: 'Muhammad Aldi',
                email: 'aldi@gmail.com',
                password: await authHelper.encryptedPassword('12345678')
            }
        ], {});

        await queryInterface.bulkInsert('Products', [
            {
                id: "PRD-113wjIO7LOoD8",
                name: "Jam Rolex",
                description: "Jam Rolex ORI",
                base_price: 1500000,
                user_id: 1,
                status: "available",
                published: true,
                categories_id: 1,
                deletedAt: null
            }
        ], {});
})

afterAll( async () => {
    //  await queryInterface.bulkDelete('Orders', null, {});
})

describe('OrderController', () => {

    describe('#handleGetAll', () => {
        it('should return status code 200 and return a order object', async () => {

            // const orders = new Orders({
            //     product_id: 'PRD-113wjIO7LOoD8',
            //     buyer_id: 2,
            //     bid_price: 90000000,
            //     status: 'pending',
            //     seller_id: 1
            // })

            const getOrders = await Orders.findAll({
            where: {
                    seller_id: req.user.id
                },
                include: [
                    {
                        model: Products, as: 'products',
                        include: [
                            {
                                model: Categories, as: 'categories'
                            }
                        ]
                    },
                    {
                        model: Users, as: 'users_buyer',
                    },
                    {
                        model: Users, as: 'users_seller',
                    }
                ],
                getOrders: [
                    ['createdAt', 'DESC']
                ]
            });

            const mockRequest = {
                body: orders
             }

             const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
             }

              const mockModel = {
                create: jest.fn().mockReturnValue(orders)
            }

            // const mockNext = jest.fn()

            const orderController = new OrderController({
                Orders: mockModel
            })

            await orderController.handleGetAllOrder(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeDefined()
            // expect(mockResponse.json).toBeCalledWith({
            //     status: 'Success',
            //     data: mockRequest.body
            // })

         });

         it('should return status 204 code and message', async () => {

            const mockRequest = {
                body: { }
             }

             const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
             }

            const mockNext = jest.fn()

            const orderController = new OrderController()

            await orderController.handleGetAllOrder(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(204)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                message: 'No content'
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