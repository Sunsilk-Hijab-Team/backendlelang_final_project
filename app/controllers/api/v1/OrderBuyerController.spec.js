const OrderBuyerController = require('./OrderBuyerController')
const { orders } = require('../../../models')

describe('OrderBuyerController', () => {

//     describe('#handleAddOrder', () => {
//         it('should return 201 status code and data order', async () => {

//             const order = new orders({
//                 id: 1,
//                 product_id: 1,
//                 buyer_id: 1,
//                 bid_price: 200000,
//                 status: "menunggu",
//                 seller_id: 1,
//                 deletedAt: null,
//             })

//             const mockOrderModel = {
//                 create: jest.fn().mockReturnValue(order),
//             }

//             const mockRequest = {
//                 body: {
//                     bid_price: 200000
//                 }
//             };

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn().mockReturnThis()
//             }

//             const mockNext = jest.fn()

//             const orderBuyerController = new OrderBuyerController();

//             await orderBuyerController.handleAddOrder(mockRequest, mockResponse, mockNext)

//             expect(mockOrderModel.create).toHaveBeenCalledWith({order});
//             expect(mockResponse.status).toBeCalledWith(200)
//             expect(mockResponse.json).toBeCalledWith({
//                 status: 'Success',
//                 data: {
//                     order
//                 }
//             })

//         })
//         it('should return 400 status code and error', async () => {

//             const mockRequest = {
//                 body: {
//                     bid_price: 200000
//                 }
//             };

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn().mockReturnThis()
//             }

//             const mockNext = jest.fn()

//             const orderBuyerController = new OrderBuyerController();

//             await orderBuyerController.handleAddOrder(mockRequest, mockResponse, mockNext)

//             expect(mockResponse.status).toBeCalledWith(400)
//             expect(mockResponse.json).toBeCalledWith({
//                 status: 'ERROR',
//                 message: 'Bad Request'
//             })

//         })
//     })
//     describe('#handleUpdateOrder', () => {
//         it('should return 201 status code and data order', async () => {

//             const order = new orders({
//                 id: 1,
//                 product_id: 1,
//                 buyer_id: 1,
//                 bid_price: 200000,
//                 status: "menunggu",
//                 seller_id: 1,
//                 deletedAt: null,
//             }
// )
//             const mockOrderModel = {
//                 findByPk: jest.fn().mockReturnValue(order)
//             }

//             const mockRequest = {
//                 params: {
//                     id: 1
//                 },
//                 body: {
//                     bid_price: 200000
//                 }
//             };

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn().mockReturnThis()
//             }

//             const mockNext = jest.fn()

//             const orderBuyerController = new OrderBuyerController();

//             await orderBuyerController.handleUpdateOrder(mockRequest, mockResponse, mockNext)

//             expect(mockOrderModel.findByPk).toHaveBeenCalledWith(mockRequest.params.id)
//             expect(mockResponse.status).toHaveBeenCalledWith(200)
//             expect(mockResponse.json).toHaveBeenCalledWith({
//                 status: 'Success',
//                 data: {
//                     order
//                 }
//             })

//         })
//         it('should return 400 status code and error', async () => {

//             const mockRequest = {
//                 params: {
//                     id: 1
//                 },
//                 body: {
//                     bid_price: 200000
//                 }
//             };

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn().mockReturnThis()
//             }

//             const mockNext = jest.fn()

//             const orderBuyerController = new OrderBuyerController();

//             await orderBuyerController.handleUpdateOrder(mockRequest, mockResponse, mockNext)

//             expect(mockResponse.status).toBeCalledWith(400)
//             expect(mockResponse.json).toBeCalledWith({
//                 status: 'ERROR',
//                 message: 'Bad Request'
//             })

//         })
//     })
//     describe('#handleGetAll', () => {
//         it('should return 200 status code and data order', async () => {

//             const order = new orders({
//                 id: 1,
//                 product_id: 1,
//                 buyer_id: 1,
//                 bid_price: 200000,
//                 status: "menunggu",
//                 seller_id: 1,
//                 deletedAt: null
//             })

//             const mockOrderModel = {
//                 findAll : jest.fn().mockReturnValue(order),
//             }

//             const mockRequest = {};

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn().mockReturnThis()
//             }

//             const mockNext = jest.fn()

//             const orderBuyerController = new OrderBuyerController();

//             await orderBuyerController.handleGetAll(mockRequest, mockResponse, mockNext)

//             expect(mockOrderModel.findAll).toHaveBeenCalled();
//             expect(mockResponse.status).toBeCalledWith(200)
//             expect(mockResponse.json).toBeCalledWith({
//                 status: 'Success',
//                 data: {
//                     order
//                 }
//             })
//         })
//         it('should return 204 status code and error', async () => {
//             const mockRequest = {};

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 message: jest.fn().mockReturnThis()
//             }

//             const mockNext = jest.fn()

//             const orderBuyerController = new OrderBuyerController();

//             await orderBuyerController.handleGetAll(mockRequest, mockResponse,mockNext)

//             expect(mockResponse.status).toBeCalledWith(204)
//             expect(mockResponse.message).toBeCalledWith({
//                 status: "No Content"
//             })
//         })
//     })
//     describe('#handleGetOrderById', () => {
//         it('should return 201 status code and data order', async () => {

//             const order = new orders({
//                 id: 1,
//                 product_id: 1,
//                 buyer_id: 1,
//                 bid_price: 200000,
//                 status: "menunggu",
//                 seller_id: 1,
//                 deletedAt: null
//             })

//             const mockOrderModel = {
//                 findByPk: jest.fn().mockReturnValue(order)
//             }

//             const mockRequest = {
//                 params: {
//                     id: 1,
//                 }
//             };

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn().mockReturnThis()
//             }

//             const mockNext = jest.fn()

//             const orderBuyerController = new OrderBuyerController();

//             await orderBuyerController.handleGetOrderById(mockRequest, mockResponse,mockNext)

//             expect(mockOrderModel.findByPk).toHaveBeenCalledWith(mockRequest.params.id)
//             expect(mockResponse.status).toBeCalledWith(200)
//             expect(mockResponse.json).toBeCalledWith({
//                 status: 'Success',
//                 data: {
//                     order
//                 }
//             })

//         })
//         it('should return 422 status code and error', async () => {

//             const mockRequest = {
//                 params: {
//                     id: 1,
//                 }
//             };

//             const mockResponse = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn().mockReturnThis()
//             }

//             const mockNext = jest.fn()

//             const orderBuyerController = new OrderBuyerController();

//             await orderBuyerController.handleGetOrderById(mockRequest, mockResponse,mockNext)

//             expect(mockResponse.status).toBeCalledWith(422)
//             expect(mockResponse.json).toBeCalledWith({
//                 status: 'ERROR',
//                 message: 'Invalid params id'
//             })

//         })
//     })


})
