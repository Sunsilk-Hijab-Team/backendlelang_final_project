const CategoryController = require('./CategoryController');
const { users, sequelize, categories } = require('../../../models');
const { queryInterface } = sequelize;

beforeAll( async () => {
    await queryInterface.bulkInsert('categories', [
        {
            name: 'Jam Tangan',
            slug: 'jam-tangan',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    ], {});
})

afterAll( async () => {
    await queryInterface.bulkDelete('categories', null, {
        truncate: true,
        restartIdentity: true,
    });
})

describe('CategoryController', () => {

    describe('#handleAdd', () => {

        it('Should return 201 code and message', async () => {

            const category = new categories ({
                id: 1,
                name: 'Jam Tangan',
                slug: 'jam-tangan'
            })

            const mockRequest = {
                body: {
                    name: category.name,
                    slug: category.slug
                }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const mockModel = {
                create: jest.fn().mockReturnValue(category)
            }

            const categoryController = new CategoryController({
                categoryModel: mockModel
            });

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

            const mockRequest = {
                params: {
                    id: category.id,
                },
                body: category
             }

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

         it('Should return 422 code ( Invalid params id ) and message', async () => {

             const category = {
                id: 1,
                name: 'Jam Tangan',
            }

            const mockRequest = {
                params: {
                    id: null
                },
                body: category
             }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleUpdate(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(422)
            expect(mockResponse.json).toBeCalledWith({
                status: 'ERROR',
                message: 'Invalid params id',
            });

         })

    });

    describe('#handleDelete', () => {

        it('Shoult return 200 code and message', async () => {
            const category = {
                id: 1,
                name: 'Jam Tangan',
            }
            const mockRequest = {
                params: {
                    id: category.id,
                }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleDelete(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                message: 'Category deleted successfully',
            })

        });

    });

    describe('#handleGetAll', () => {

        it('Should return 200 code and message', async () => {

            const Category = {
                id: 1,
                name: 'Jam Tangan',
                slug: 'jam-tangan',
            }

            const mockRequest = {    }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleGetAll(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                message: 'Categorys retrieved successfully',
                data: {
                    categories: Category
                }
            })

        })

        it('Should return 204 code and message', async () => {

            const mockRequest = {   }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleGetAll(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(204)
            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                message: 'No categorys found',
            })

        })

    });

});