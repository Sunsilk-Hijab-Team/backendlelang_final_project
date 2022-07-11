// const request = require('supertest');
// const app = require('../../../app');
// const { Users } = require('../../../app/models');

// describe('PUT /v1/user/update/:id', () => {
//   let token;
//   beforeAll((done) => {
//     request(app)
//       .post('/v1/auth/login')
//       .send({
//         email: 'user1@binar.co.id',
//         password: '123456',
//       })
//       .expect(200)
//       .end((err, res) => {
//         if(err) throw err;
//         token = res.body.data.accessToken;
//         done();
//       });
//   });

//   let users;
//   beforeEach(async () => {
//     users = await Users.create({
//       full_name: "Test User",
//       email: "testuser@binar.com",
//       password: 123456,
//       phone: "081234567890",
//       address: "test address",
//       image_url: "test-image-url.com",
//     });
//     return users;
//   });
//   afterEach(() => users.destroy());

//   it("should response with 201 as status code", async () => {
//     const name = "Test User Update";
//     const image = "test-image-url.com";
//     const city = "City Update";
//     const address ="test address update";
//     const phone ="081234567899";

//     return request(app)
//       .put(`/v1/auth/user/${users.id}`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ name,image,city, address, phone })
//       .then((res) => {
//         expect(res.statusCode).toBe(201);
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             status: expect.any(String),
//             data: expect.toEqual(
//               expect.objectContaining({
//                 full_name: expect.any(String),
//                 city: expect.any(String),
//                 address: expect.any(Number),
//                 phone: expect.any(String),
//                 image_url: expect.any(String),
//                 updated_at: expect.any(String)
//               })
//             )
//           })
//         );
//       });
//   });

//   it("should response with 400 as status code", async () => {
//     const full_name = "";
//     const address = "";
//     const phone = "";
//     const image_url = null;

//     return request(app)
//       .put(`/v1/cars/${users.id}`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ full_name, address, phone, image_url })
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             message: expect.any(String)
//           })
//         );
//       });
//   });
// });

// describe('GET /v1/auth/user/whoami', () => {
//   let token;

//   beforeAll((done) => {
//     request(app)
//       .post('/v1/auth/login')
//       .send({
//         email: 'user1@binar.co.id',
//         password: '123456',
//       })
//       .expect(201)
//       .end((err, res) => {
//         if(err) throw err;
//         token = res.body.data.accessToken;
//         done();
//       });
//   });

//   it("should response with 200 as status code", async () => {

//     return request(app)
//       .get("/v1/auth/user/whoami")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//       });
//   });
// });
