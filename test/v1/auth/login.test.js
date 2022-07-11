// const request = require('supertest');
// const app = require('../../../app');

// describe('POST /v1/auth/login', () => {
//   it("should response with 200 as status code", async () => {
//     const email = "mawang@binar.com";
//     const password = "rahasia";

//     return request(app)
//       .post("/v1/auth/login")
//       .set("Content-Type", "application/json")
//       .send({ email, password })
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             status: expect.any(String),
//             data: expect.objectContaining({
//               email : expect.toEqual("mawang@binar.com"),
//               token: expect.any(String)
//             }),
//           })
//         );
//       });
//   });

//   it("should response with 400 as status code", async () => {
//     const email = "salah@binar.com";
//     const password = "salah";

//     return request(app)
//       .post("/v1/auth/login")
//       .set("Content-Type", "application/json")
//       .send({ email, password })
//       .then((res) => {
//         expect(res.statusCode).toBe(404);
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             message: expect.any(String)
//           })
//         );
//       });
//   });
// });