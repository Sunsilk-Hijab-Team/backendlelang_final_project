const AuthenticationController = require('./AuthenticationController');
const authHelper = require('../../../helpers/AuthenticationHelper');
const { users, sequelize } = require('../../../models');
const { queryInterface } = sequelize;


beforeAll(() => {

})

afterAll( async () => {
    await queryInterface.bulkDelete('users', null, {});
})

describe('AuthenticationController', () => {

    describe('#handleRegister', () => {

        it('Should return 201 code', async () => {

            const user = new users({
                    id: 1,
                    full_name: 'Muhammad Agung',
                    email: 'muhammadagung@gmail.com',
                    password: await authHelper.encryptedPassword('12345678')
                });

            const mockModel = {
                create: jest.fn().mockReturnValue()
            }

            const mockRequest = {
                body: {
                    full_name: user.full_name,
                    email: user.email,
                    password: user.password
                }
             }

            const mockResponse =  {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
                }

            const mockNext = jest.fn()

            const authenticationController = new AuthenticationController({
                userModel: mockModel,
            });

            await authenticationController.handleRegister(mockRequest, mockResponse, mockNext)

            expect(mockModel.create).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalled(201)
            expect(mockResponse.json).toHaveBeenCalledWith({
                accessToken: expect.any(String)
            })

        });

        it('Should return error 409 and message', async () => {

            const user = new users({
                full_name: 'Muhammad Agung ke 2',
                email: 'muhammadagung@gmail.com',
                password: await authHelper.encryptedPassword('12345678')
            })

            const mockRequest = { body:
                {
                    full_name: user.full_name,
                    email: user.email,
                    password: user.password
                },
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const mockModel = {
                findOne: jest.fn().mockReturnValue(user)
            }

            const authenticationController = new AuthenticationController({
                userModel: mockModel,
            });

            await authenticationController.handleRegister(mockRequest, mockResponse, mockNext)

            expect(mockModel.findOne).toHaveBeenCalledWidth({
                where: {
                    email: mockRequest.body.email
                }
            });
            expect(mockResponse.status).toHaveBeenCalledWith(409)
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'error',
                message: 'This email already exists',
            });

        });

    });

    describe('#handleLogin', () => {

        it('Should return 201 code and return access token', async () => {
            const user = new users({
                email: 'muhammadagung@gmail.com',
                password: '12345678'
            })

            const mockRequest =  {
                body: {
                    email: user.email,
                    password: user.password
                }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()


            const mockModel = {
                findOne: jest.fn().mockReturnValue(user)
            }

            const authenticationController = new AuthenticationController({
                userModel: mockModel,
            })

            await authenticationController.handleLogin(mockRequest, mockResponse, mockNext)

            expect(mockModel.findOne).toHaveBeenCalledWith({
                where: {
                    email: mockRequest.body.email
                }
            })
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'LOGIN SUCCESS',
                accessToken: expect.any(String),
            });
        });

        it('Should return 401 code and return error message', async () => {
            const user = new users ({
                email: 'muhammad@gmail.com',
                password: '12345678'
            })

            const mockRequest = {
                body: {
                    email: user.email,
                    password: user.password
                }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const mockModel = {
                findOne: jest.fn().mockReturnValue(null)
            }

            const authenticationController = new AuthenticationController({
                userModel: mockModel,
            });

            await authenticationController.handleLogin(mockRequest, mockResponse, mockNext)

            expect(mockModel.findOne).toHaveBeenCalledWith({
                where: {
                    email: mockRequest.body.email
                }
            })
            expect(mockResponse.status).toHaveBeenCalled(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'ERROR',
                message: 'Invalid email or password',
            })
        })

    });

    describe('#handeUpdate', () => {

        it('Shoult return 200 code and message', async () => {
            const userUpdate = new  users({
                id: 1,
                full_name: 'Muhammad Agung Hercules',
                image_url: 'https://www.cloud.com/image_profile.png',
                city: 'Bandung',
                address: 'Lorem ipsum dolor sit amet',
                phone: '085788888888',
            })

            const mockRequest = {
                params: {
                    id: userUpdate.id
                },

                body: {
                    full_name: userUpdate.full_name,
                    image_url: userUpdate.image_url,
                    city: userUpdate.city,
                    address: userUpdate.address,
                    phone: userUpdate.phone,
                }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const mockModel = {
                findByPk: jest.fn().mockReturnValue(userUpdate),
            }

            const authenticationController = new AuthenticationController({
                userModel: mockModel,
            });

            await authenticationController.handleUpdate(mockRequest, mockResponse, mockNext)

            expect(mockModel.findByPk).toHaveBeenCalledWidth(mockRequest.params.id)
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'SUCCESS',
                message: 'User updated successfully',
            })

        });

        it('Should return 422 code ( Invalid params id )and message', async () => {

            const userUpdate = new users ({
                full_name: 'Muhammad Agung Hercules',
                image_url: 'https://www.cloud.com/image_profile.png',
                city: 'Bandung',
                address: 'Lorem ipsum dolor sit amet',
                phone: '085788888888',
            })

            const mockRequest = {
                params: {
                    id: null
                 },
                body: {
                    full_name: userUpdate.full_name,
                    image_url: userUpdate.image_url,
                    city: userUpdate.city,
                    address: userUpdate.address,
                    phone: userUpdate.phone,
                }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const mockModel = {
                findByPk: jest.fn().mockReturnValue(userUpdate),
            }

            const authenticationController = new AuthenticationController({
                userModel: mockModel,
            });

            await authenticationController.handleUpdate(mockRequest, mockResponse, mockNext)

            expect(mockModel.findByPk).toHaveBeenCalledWidth(mockRequest.params.id)
            expect(mockResponse.status).toHaveBeenCalledWith(422);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'ERROR',
                message: 'Invalid params id',
            })

        });

    });

    describe('#handleWhoami', () => {

        it('Should return 200 code and return user data', async () => {
            const user = new users ({
                id: 1,
                full_name: 'Muhammad Agung Hercules',
                email: 'muhammadagung@gmail.com',
                image_url: 'https://www.cloud.com/image_profile.png',
                city: 'Bandung',
                address: 'Lorem ipsum dolor sit amet',
                phone: '085788888888',
            });

            const mockRequest = {
                user: {
                    id: user.id
                }
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const mockModel = {
                ...user.dataValues,
                findByPk: jest.fn().mockReturnThisValue(user)
            }

            const authenticationController = new AuthenticationController({
                userModel: mockModel,
            });

            await authenticationController.handleWhoami(mockRequest, mockResponse, mockNext)

            expect(mockModel.findByPk).toHaveBeenCalledWith(user.id)
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'SUCCESS',
                user
            })

        })

    })



});