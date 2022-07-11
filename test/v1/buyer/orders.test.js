// const request = require("supertest");
// const app = require("../../../app");
// const { Orders } = require("../../../app/models");
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
// describe("POST /v1/buyer/order/buy", () => {
//     it("should return 200 OK", async () => {
//         return request(app)
//         .post("/v1/buyer/order/buy")
//         .set("Content-Type", "application/json")
//         .set("Authorization", `Bearer ${token}`)
//         .send({

//         })
//         .then((res) => {
//             expect(res.status).toBe(200);
//             expect(res.body.Orders).toBeDefined();
//         });
//     });
// });
// describe("PUT /v1/buyer/order/price-appeal/{id}", () => {
//   // 200
//   it("should return 200 OK", async () => {
//     return request(app)
//       .put("/v1/buyer/order/price-appeal/1")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         bid_price: 100000,
//       })
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body.Orders).toBeDefined();
//       });
//   });
// });
// describe("GET /v1/buyer/order", () => {
//   // 200
//   it("should return 200 OK", async () => {
//     return request(app)
//       .get("/v1/buyer/order")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body.Orders).toBeDefined();
//       });
//   });
// });
// describe("GET /v1/buyer/order/product/{id}", () => {
//   // 200
//   it("should return 200 OK", async () => {
//     return request(app)
//       .get("/v1/buyer/order/product/1")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body.Orders).toBeDefined();
//       });
//   });
// });