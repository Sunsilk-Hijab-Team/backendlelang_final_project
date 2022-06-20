const CategoryController = require('./CategoryController');

describe('CategoryController', () => {

    describe('#handleAdd', () => {

        it('Should return 201 code and message', async () => {

            const category = {
                id: 1,
                name: 'Jam Tangan',
            }

            const mockRequest = { body: category }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleAdd(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(201)
            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                message: 'Category added successfully',
            });

        });

        it('Should return error 409 and message', async () => {
            const category = {
                id: 1,
                name: 'Jam Tangan',
                slug: 'jam-tangan',
            }

            const mockRequest = { body: category }

            const mockResponse =  {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleAdd(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(409)
            expect(mockResponse.json).toBeCalledWith({
                status: 'error',
                message: 'Category already exists',
            })

        });

    });

    describe('#hanldeUpdate', () => {

        it('Should return 200 code and message', async () => {

            const category = {
                id: 1,
                name: 'Jam Tangan',
            }

            const mockRequest = { body: category }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleUpdate(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                message: 'Category updated successfully',
            });

        });

    });

});