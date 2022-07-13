// const request = require("supertest");
// const app = require("../../../app");
// const { Products } = require("../../../app/models");
// const { Op } = require("sequelize");

// let token;
// beforeAll((done) => {
//   request(app)
//     .post('/v1/auth/login')
//     .send({
//       email: 'john@binar.com',
//       password: 'rahasia',
//     })
//     .expect(200)
//     .end((err, res) => {
//       if(err) throw err;
//       token = res.body.data.accessToken;
//       done();
//     });
// });

// describe("GET /v1/buyer/product/all", () => {
//     it("should return 200 OK", async () => {
//       return request(app)
//         .get("/v1/buyer/product/all")
//         .then((res) => {
//           expect(res.status).toBe(200);
//           expect(res.body.Products).toBeDefined();
//         });
//     });
//     // 204 no content
//     it("should return 204 no content", async () => {
//       return request(app)
//         .get("/v1/buyer/product/all")
//         .set("Authorization", `Bearer ${token}`)
//         .then((res) => {
//           expect(res.status).toBe(204);
//         });
//     });
// });
// // by id
// describe("GET /v1/buyer/product/:id", () => {
//   it("should return 200 OK", async () => {
//     return request(app)
//       .get("/v1/buyer/product/1")
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body.Products).toBeDefined();
//       });
//   });
//   // 204 no content
//   it("should return 204 NO CONTENT", async () => {
//     return request(app)
//       .get("/v1/buyer/product/0")
//       .then((res) => {
//         expect(res.status).toBe(204);
//       });
//     }
//   );
//   // 404
//   it("should return 404", async () => {
//     return request(app)
//       .get("/v1/buyer/product/100")
//       .then((res) => {
//         expect(res.status).toBe(404);
//       });
//   });
// });