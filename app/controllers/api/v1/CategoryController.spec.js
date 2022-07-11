const CategoryController = require('./CategoryController');
const Slug = require('../../../helpers/slug');
const { sequelize, Categories } = require('../../../models');
const { queryInterface } = sequelize;

beforeAll( async () => {
    // await queryInterface.bulkInsert('Categories', [
    //     {
    //         name: 'Jam Tangan',
    //         slug: 'jam-tangan',
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         deletedAt: null
    //     }
    // ], {});
})

afterAll( async () => {
    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        restartIdentity: true,
    });
})

describe('CategoryController', () => {

    describe('#handleAdd', () => {

        it('Should return 201 code and message', async () => {

            const category = new Categories ({
                name: 'Jam Tangan',
            })

            const mockRequest = {
                body: {
                    id: 1,
                    name: category.name,
                    slug: Slug.generateSlug(category.name),
                }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockModel = {
                create: jest.fn().mockReturnValue(category)
            }

            const categoryController = new CategoryController({
                categoryModel: mockModel
            });

            await categoryController.handleAdd(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(201)
            expect(mockResponse.json).toBeDefined()
            // expect(mockResponse.json).toBeCalledWith({
            //     status: 'Created',
            //     category
            // });

        });

        it('Should return error 409 and message', async () => {
            const category = {
                name: 'Jam Tangan',
                slug: 'jam-tangan',
            }

            const mockRequest = { body: {
                id: 1,
                name: category.name,
                slug: Slug.generateSlug(category.name),
            } }

            const mockResponse =  {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleAdd(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(409)
            expect(mockResponse.json).toBeCalledWith({
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
                status: 'Success',
                updateCategory: [
                    1
                ]
            });

        });

    });

    describe('#handleList', () => {

        it('Should return 200 code and message', async () => {

            const Category = await Categories.findAll();

            const mockRequest = {    }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleList(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                categories: Category
            })

        })

    });


    describe('#handleGetById', () => {

        it('Shoult return 200 code and message', async () => {

            const id = 1;

            const category = await Categories.findByPk(id);

            const mockRequest = {
                params: {
                    id: id
                },
                body: category
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const categoryController = new CategoryController();

            await categoryController.handleGetById(mockRequest, mockResponse);

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                category
            })

        })

    })

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
                status: 'Success',
                category: 1
            })

        });

    });

    describe('#handleList', () => {

        it('Should return 204 code and message', async () => {
            const category = await Categories.findAll();

            const mockRequest = {   }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const categoryController = new CategoryController();

            await categoryController.handleList(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(204)
            expect(mockResponse.json).toBeCalledWith({
                status: 'Success',
                message: 'No content',
                categories: category
            })

        })

    });


    describe('#handleGetById', () => {

        it('Shoult return 200 code and message', async () => {

            const id = 2;

            const category = await Categories.findByPk(id);

            const mockRequest = {
                params: {
                    id: id
                },
                body: category
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const categoryController = new CategoryController();

            await categoryController.handleGetById(mockRequest, mockResponse);

            expect(mockResponse.status).toBeCalledWith(409)
            expect(mockResponse.json).toBeCalledWith({
                status: "Error",
                message:'Invalid params id'
            })
        })

    })

      describe('#hanldeUpdate', () => {

         it('Should return 409 code ( Invalid params id ) and message', async () => {

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

            expect(mockResponse.status).toBeCalledWith(409)
            expect(mockResponse.json).toBeCalledWith({
                status: "Error",
                message: 'Invalid params id'
            });

         })

    });

});