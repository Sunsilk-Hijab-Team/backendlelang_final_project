const { users } = require('../../../models');
const AuthenticationController = require('./AuthenticationController');
const AuthHelper = require('../../../helpers/AuthenticationHelper');

beforeAll(() => {

})

afterAll(() => {

})

describe('AuthenticationController', () => {

    describe('#handleRegister', () => {

        it('Should return 201 code', async () => {

            const user = {
                id: 1,
                full_name: 'Muhammad Agung',
                email: 'muhammadagung@gmail.com',
                password: await AuthHelper.encryptPassword('12345678')
                };

            const mockRequest = { body: user }
            const mockResponse =  {
                status: jest.fn().mockReturnThis(),
                }
            const mockNext = jest.fn()

            const authenticationController = new AuthenticationController();

            await authenticationController.handleRegister(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(201)
            expect(mockResponse.json).toBeCalledWith(
                expect.objectContaining({
                    accessToken: expect.any(String),
                })
            );

        });

        it('Should return error 409 and message', async () => {

            const user = {
                full_name: 'Muhammad Agung ke 2',
                email: 'muhammadagung@gmail.com',
                password: await AuthHelper.encryptPassword('12345678')
            }

            const mockRequest = { body: user }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const authenticationController = new AuthenticationController();

            await authenticationController.handleRegister(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(409)
            expect(mockResponse.json).toBeCalledWith({
                status: 'error',
                message: 'This email already exists',
            });

        });

    });

    describe('#handleLogin', () => {

        it('Should return 201 code and return access token', async () => {
            const user = {
                email: 'muhammadagung@gmail.com',
                password: '12345678'
            }

            const mockRequest =  {
                body: user
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const authenticationController = new AuthenticationController()

            await authenticationController.handleLogin(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(201);
            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                accessToken: expect.any(String),
            });
        });

        it('Should return 401 code and return error message', async () => {
            const user = {
                email: 'muhammad@gmail.com',
                password: '12345678'
            }

            const mockRequest = {
                body: user
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const authenticationController = new AuthenticationController();

            await authenticationController.handleLogin(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toHaveBeenCalled(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'ERROR',
                message: 'Invalid email or password',
            })
        })

    });

    describe('#handeUpdate', () => {

        it('Shoult return 200 code and message', async () => {
            const userUpdate = {
                full_name: 'Muhammad Agung Hercules',
                image_url: 'https://www.cloud.com/image_profile.png',
                kota: 'Bandung',
                alamat: 'Lorem ipsum dolor sit amet',
                phone: '085788888888',
            }

            const mockRequest = {
                params: {
                    id: userUpdate.id
                },

                body: userUpdate
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const authenticationController = new AuthenticationController();

            await authenticationController.handleUpdate(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200);
            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                message: 'User updated successfully',
            })

        });

        it('Should return 422 code ( Invalid params id )and message', async () => {

            const userUpdate = {
                full_name: 'Muhammad Agung Hercules',
                image_url: 'https://www.cloud.com/image_profile.png',
                kota: 'Bandung',
                alamat: 'Lorem ipsum dolor sit amet',
                phone: '085788888888',
            }

            const mockRequest = {
                params: {  },
                body: userUpdate
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const mockNext = jest.fn()

            const authenticationController = new AuthenticationController();

            await authenticationController.handleUpdate(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(422);
            expect(mockResponse.json).toBeCalledWith({
                status: 'ERROR',
                message: 'Invalid params id',
            })

        });

    });

    describe('#handleWhoami', () => {

        it('Should return 200 code and return user data', async () => {
            const user = {
                id: 1,
                full_name: 'Muhammad Agung Hercules',
                email: 'muhammadagung@gmail.com',
                image_url: 'https://www.cloud.com/image_profile.png',
                phone: '085788888888',
                address: 'Lorem ipsum dolor sit amet',
            };

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

            const authenticationController = new AuthenticationController();

            await authenticationController.handleWhoami(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toBeCalledWith(200);
            expect(mockResponse.json).toBeCalledWith({
                status: 'SUCCESS',
                data: expect.objectContaining({
                    user
                })
            })

        })

    })



});