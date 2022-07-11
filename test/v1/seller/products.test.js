// const request = require("supertest");
// const app = require("../../../app");
// const { Products } = require("../../../app/models");
// const { Op } = require("sequelize");

// let token;
// beforeAll((done) => {
//   request(app)
//     .post('/v1/auth/login')
//     .send({
//       email: 'user1@binar.co.id',
//       password: 'rahasia',
//     })
//     .expect(200)
//     .end((err, res) => {
//       if(err) throw err;
//       token = res.body.data.accessToken;
//       done();
//     });
// });
// afterAll(() => Products.destroy());

// describe("GET /v1/seller/product/all", () => {
//     it("should return 200 OK", async () => {
//       return request(app)
//         .get("/v1/seller/product/all")
//         .then((res) => {
//           expect(res.status).toBe(200);
//           expect(res.body.Products).toBeDefined();
//         });
//     });
//     // 204 no content
//     it("should return 204 no content", async () => {
//       return request(app)
//         .get("/v1/seller/product/all")
//         .set("Authorization", `Bearer ${token}`)
//         .then((res) => {
//           expect(res.status).toBe(204);
//         });
//     });
// });

// describe("POST /v1/seller/product/add", () => {
//   it("should response with 201 as status code", async () => {
//     const name = "BMW i4";
//     const description = "BMW i4";
//     const base_price = 10000000;
//     const category = "otomotif";

//     return request(app)
//       .post("/v1/seller/product/add")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ name, description, base_price, category })
//       .then((res) => {
//         expect(res.statusCode).toBe(201);
//         expect(res.body).toBeDefined();
//       });
//   });
//   it ("should response with 400 as status code", async () => {
//     const name = "";
//     const description = "";
//     const base_price = "";
//     const category = "";

//     return request(app)
//       .post("/v1/cars")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ name, description, base_price, category })
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         expect(res.body.error).toBeDefined();
//       });
//   });
// });
// describe("PUT /v1/seller/product/update/{id}", () => {
//   it("should response with 200 as status code", async () => {
//     const name = "BMW i4 Updated";
//     const description = "BMW i4";
//     const base_price = 10000000;
//     const category = "otomotif";

//     return request(app)
//       .put(`/v1/seller/product/update/${products.id}`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ name, description, base_price, category })
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//       });
//   });
//   // 400 bad request
//   it("should response with 400 as status code", async () => {
//     const name = "";
//     const description = "";
//     const base_price = "";
//     const category = "";

//     return request(app)
//       .put(`/v1/seller/product/update/${products.id}`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ name, description, base_price, category })
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         expect(res.body.error).toBeDefined();
//       });
//   });
// });
// describe("DELETE /v1/seller/product/delete/{id}", () => {
//   it("should response with 200 as status code", async () => {
//     return request(app)
//       .delete(`/v1/seller/product/delete/${products.id}`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//       });
//   });
//   // 404
//   it("should response with 404 as status code", async () => {
//     return request(app)
//       .delete(`/v1/seller/product/delete/1`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .then((res) => {
//         expect(res.statusCode).toBe(404);
//         expect(res.body.error).toBeDefined();
//       });
//   });
// });
// describe("PUT /v1/seller/product/status/{id}", () => {
//   // edit status
//   const status ="sold";
//   it("should response with 200 as status code", async () => {
//     return request(app)
//       .put(`/v1/seller/product/status/${products.id}`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ status })
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//       });
//   });
//   // 400
//   it("should response with 404 as status code", async () => {
//     return request(app)
//       .put(`/v1/seller/product/status/1`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ status })
//       .then((res) => {
//         expect(res.statusCode).toBe(404);
//         expect(res.body.error).toBeDefined();
//       });
//   });
// });
// describe("POST /v1/seller/product/{id}/images", () => {
//   it("should response with 201 as status code", async () => {
//     const image = "https://www.bmw.co.id/wp-content/uploads/2019/01/BMW-i4-2019-1.jpg";
//     return request(app)
//       .post(`/v1/seller/product/${products.id}/images`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ image })
//       .then((res) => {
//         expect(res.statusCode).toBe(201);
//         expect(res.body).toBeDefined();
//       });
//   });
//   it("should response with 400 as status code", async () => {
//     const image = "";
//     return request(app)
//       .post(`/v1/seller/product/${products.id}/images`)
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({ image })
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         expect(res.body.error).toBeDefined();
//       });
//   });
// });
// describe("GET /v1/seller/product/orderByCategory/{slug}", () => {
//     it("should response with 200 as status code", async () => {
//         return request(app)
//         .get(`/v1/seller/product/orderByCategory/otomotif`)
//         .set("Content-Type", "application/json")
//         .set("Authorization", `Bearer ${token}`)
//         .then((res) => {
//             expect(res.statusCode).toBe(200);
//             expect(res.body).toBeDefined();
//         });
//     });
//     // 204
//     it("should response with 204 as status code", async () => {
//         return request(app)
//         .get(`/v1/seller/product/orderByCategory/`)
//         .set("Content-Type", "application/json")
//         .set("Authorization", `Bearer ${token}`)
//         .then((res) => {
//             expect(res.statusCode).toBe(204);
//             expect(res.body).toBeDefined();
//         });
//     });
// });