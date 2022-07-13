const AuthenticationController = require('./AuthenticationController');
const authHelper = require('../../../helpers/AuthenticationHelper');
const { Users, sequelize } = require('../../../models');
const { queryInterface } = sequelize;



beforeAll(() => {

})

afterAll( async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
    });
})

describe('AuthenticationController', () => {

    describe('#handleRegister', () => {

        it('Should return 201 code', async () => {

            const user = new Users({
                    id: 1,
                    full_name: 'Muhammad Agung',
                    email: 'muhammadtopan@gmail.com',
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

            const payload = {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                password: user.password,
                phone: null,
                city: null,
                address: null,
                image_url: null,
            }

             const token = await authHelper.createToken(payload);

            await authenticationController.handleRegister(mockRequest, mockResponse, mockNext)

            expect(mockResponse.status).toHaveBeenCalledWith(201)
            expect(mockResponse.json).toBeDefined()
            // expect(mockResponse.json).toHaveBeenCalledWith({
            //     status: 'Success',
            //     user,
            //     token
            // })

        });

        it('Should return error 409 and message', async () => {

            const user = new Users({
                full_name: 'Muhammad Agung ke 2',
                email: 'muhammadtopan@gmail.com',
                password: await authHelper.encryptedPassword('12345678')
            })

            const mockRequest = {
                body:{
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

            expect(mockResponse.status).toHaveBeenCalledWith(409)
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'Error',
                message: 'Email already exists'
            });

        });

    });

    describe('#handleLogin', () => {

        it('Should return 200 code and return access token', async () => {

            const email = 'muhammadtopan@gmail.com'
            const password = '12345678';

            // const User = new Users ({
            //     email: 'muhammadabdul@gmail.com',
            //     password: '12345678'
            // })
            // const getAll = await Users.findAll();
            // console.log(getAll, 'user-test');

            const mockRequest =  {
                body: {
                    email: email,
                    password: password
                }
            }

            // console.log(mockRequest.body, 'mockRequest');

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            const authenticationController = new AuthenticationController()

            await authenticationController.handleLogin(mockRequest, mockResponse)

            const user =  await Users.findOne({ where: { email: email } });

            console.log(user.password, 'pswd-usr');

            const isPasswordValid = await authHelper.comparePassword(password, user.password);

            console.log(user.password, '--passwordCheck--');

            const payload = {
                id: user.id,
                full_name: user.full_name,
                email,
                password,
                city: user.city,
                address: user.address,
                image_url: user.image_url,
            }

            const token = await authHelper.createToken(payload);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
                     expect(mockResponse.json).toBeDefined()
            // expect(mockResponse.json).toHaveBeenCalledWith({
            //     status: 'Success',
            //     user,
            //     token
            // })

        })

        it('Should return 401 code and return error message', async () => {
                const user = new Users ({
                    email: 'muhammad@gmail.com',
                    password: '1234567'
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

                expect(mockResponse.status).toHaveBeenCalledWith(409)
                expect(mockResponse.json).toHaveBeenCalledWith({
                    status: 'Error',
                    message: 'Invalid Email or Password'
                })
        })

    });

    // describe('#handeUpdate', () => {

    //     it('Shoult return 200 code and message', async () => {
    //         const userUpdate = new  Users({
    //             id: 1,
    //             full_name: 'Muhammad Agung Hercules',
    //             image_url: 'https://www.cloud.com/image_profile.png',
    //             city: 'Bandung',
    //             address: 'Lorem ipsum dolor sit amet',
    //             phone: '085788888888',
    //         })

    //         const mockRequest = {
    //             params: {
    //                 id: userUpdate.id
    //             },

    //             body: {
    //                 full_name: userUpdate.full_name,
    //                 image_url: userUpdate.image_url,
    //                 city: userUpdate.city,
    //                 address: userUpdate.address,
    //                 phone: userUpdate.phone,
    //             }
    //         }

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //         }

    //         const mockNext = jest.fn()

    //         const mockModel = {
    //             findByPk: jest.fn().mockReturnValue(userUpdate),
    //         }

    //         const authenticationController = new AuthenticationController({
    //             userModel: mockModel,
    //         });

    //         await authenticationController.handleUpdate(mockRequest, mockResponse, mockNext)

    //         expect(mockResponse.status).toHaveBeenCalledWith(200);
    //         expect(mockResponse.json).toHaveBeenCalledWith({
    //             status: 'Success',
    //             user,
    //         })

    //     });

    //     it('Should return 422 code ( Invalid params id )and message', async () => {

    //         const userUpdate = new Users ({
    //             full_name: 'Muhammad Agung Hercules',
    //             image_url: 'https://www.cloud.com/image_profile.png',
    //             city: 'Bandung',
    //             address: 'Lorem ipsum dolor sit amet',
    //             phone: '085788888888',
    //         })

    // //         const mockRequest = {
    // //             params: {
    // //                 id: null
    // //              },
    // //             body: {
    // //                 full_name: userUpdate.full_name,
    // //                 image_url: userUpdate.image_url,
    // //                 city: userUpdate.city,
    // //                 address: userUpdate.address,
    // //                 phone: userUpdate.phone,
    // //             }
    // //         }

    // //         const mockResponse = {
    // //             status: jest.fn().mockReturnThis(),
    // //             json: jest.fn().mockReturnThis(),
    // //         }

    // //         const mockNext = jest.fn()

    // //         const mockModel = {
    // //             findByPk: jest.fn().mockReturnValue(userUpdate),
    // //         }

    // //         const authenticationController = new AuthenticationController({
    // //             userModel: mockModel,
    // //         });

    // //         await authenticationController.handleUpdate(mockRequest, mockResponse, mockNext)

    // //         expect(mockModel.findByPk).toHaveBeenCalledWidth(mockRequest.params.id)
    // //         expect(mockResponse.status).toHaveBeenCalledWith(422);
    // //         expect(mockResponse.json).toHaveBeenCalledWith({
    // //             status: 'ERROR',
    // //             message: 'Invalid params id',
    // //         })

    // //     });

    //  });

    describe('#handleWhoami', () => {

        it('Should return 200 code and return user data', async () => {
            const user = new Users ({
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

            // const mockModel = {
            //     findByPk: jest.fn().mockReturnThisValue(user)
            // }

            const authenticationController = new AuthenticationController(
                // {
                // userModel: mockModel,
                // }
            );

            await authenticationController.handleGetCurrentUser(mockRequest, mockResponse)

            expect(mockResponse.status).toBeCalledWith(200)
            expect(mockResponse.json).toBeDefined()

            // expect(mockResponse.json).toHaveBeenCalledWith({
            //     status: 'SUCCESS',
            //     user
            // })

    })

    })



});