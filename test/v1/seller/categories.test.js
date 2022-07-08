// const request = require("supertest");
// const app = require("../../../app");
// const { Categories } = require("../../../app/models");
// const { Op } = require("sequelize");

// let token;
// beforeAll((done) => {
//   request(app)
//     .post('/v1/auth/login')
//     .send({
//       email: 'user1@binar.co.id',
//       password: '123456',
//     })
//     .expect(200)
//     .end((err, res) => {
//       if(err) throw err;
//       token = res.body.data.accessToken;
//       done();
//     });
// });

// beforeEach(async () => {
//   await Categories.create({
//     name: "Electronics",
//     slug: "electronics",
//   });
// });

// afterEach(async () => {
//   await Categories.destroy({
//     where: {
//       name: "electronics"
//     },
//   });
// });

// describe("GET /v1/seller/category/all", () => {
//   it("should return 200 OK", async () => {
//     return request(app)
//       .get("/v1/sellery/category/all")
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toBeDefined();
//       });
//   });
// });

// describe("GET /v1/seller/category/{id}", () => {
//   it("should return 200 OK", async () => {
//     return request(app)
//       .get("/v1/seller/category/1")
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toBeDefined();
//       });
//   });
// });

// describe("POST /v1/seller/category/add", () => {
//   it("should return 201 CREATED", async () => {
//     return request(app)
//       .post("/v1/seller/category")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Category New",
//         slug: "category-new",
//       })
//       .then((res) => {
//         expect(res.status).toBe(201);
//         expect(res.body).toBeDefined();
//       });
//   });
//   // 400 bad request
//   it("should return 400 BAD REQUEST", async () => {
//     return request(app)
//       .post("/v1/seller/category")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Category New",
//         slug: "category-new",
//       })
//       .then((res) => {
//         expect(res.status).toBe(400);
//         expect(res.body).toBeDefined();
//       });
//   });
// });

// describe("PUT /v1/seller/category/{id}", () => {
//   it("should return 200 OK", async () => {
//     return request(app)
//       .put("/v1/seller/category/2")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Category Updated"
//       })
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toBeDefined();
//       });
//   });
//   // 400 bad request
//   it("should return 400 BAD REQUEST", async () => {
//     return request(app)
//       .put("/v1/seller/category/2")
//       .set("Content-Type", "application/json")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Category Updated"
//       })
//       .then((res) => {
//         expect(res.status).toBe(400);
//         expect(res.body).toBeDefined();
//       });
//   });
// });

// describe("DELETE /v1/seller/category/delete/{id}", () => {
//   it("should return 200 Success", async () => {
//     return request(app)
//       .delete("/v1/seller/category/delete/191")
//       .set("Authorization", `Bearer ${token}`)
//       .then((res) => {
//         expect(res.status).toBe(204);
//       });
//   });
//   // 400 bad request
//   it("should return 400 BAD REQUEST", async () => {
//     return request(app)
//       .delete("/v1/seller/category/delete/191")
//       .set("Authorization", `Bearer ${token}`)
//       .then((res) => {
//         expect(res.status).toBe(400);
//       });
//   });
// });
