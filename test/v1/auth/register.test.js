// const request = require('supertest');
// const app = require('../../../app');
// const { Users } = require("../app/models");

// afterAll(async () => {
//   await User.destroy({
//     where: {
//       email: "mawang@gmail.com",
//     },
//   });
// });

// describe('POST /v1/auth/register', () => {
//   it("should response with 201 as status code", async () => {
//     const name = "Mawang";
//     const email = "mawang@gmail.com";
//     const password = "rahasia";

//     return request(app)
//       .post("/v1/auth/register")
//       .set("Content-Type", "application/json")
//       .send({ name, email, password })
//       .then((res) => {
//         expect(res.statusCode).toBe(201);
//         expect(res.body).toBeDefined();
//       });
//   });

//   it("should response with 400 as status code", async () => {
//     const name = "gagal";
//     const email = "gagal@binar.co.id";
//     const password = "123456";

//     return request(app)
//       .post("/v1/auth/register")
//       .set("Content-Type", "application/json")
//       .send({ name, email, password })
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         expect(res.body.error).toBeDefined();
//       });
//   });
// });