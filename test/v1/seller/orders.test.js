const request = require("supertest");
const app = require("../../../app");
const { Orders } = require("../../../app/models");
const { Op } = require("sequelize");

let token;
beforeAll((done) => {
  request(app)
    .post('/v1/auth/login')
    .send({
      email: 'john@binar.com',
      password: 'rahasia',
    })
    .expect(200)
    .end((err, res) => {
      if(err) throw err;
      token = res.body.data.accessToken;
      done();
    });
});

describe("GET /v1/seller/order", () => {
    it("should return 200 OK", async () => {
        return request(app)
        .get("/v1/seller/order")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.Orders).toBeDefined();
        });
    });
});
describe("GET /v1/seller/order/:id", () => {
    it("should return 200 OK", async () => {
        return request(app)
        .get("/v1/seller/order/1")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.Orders).toBeDefined();
        });
    });
    // 404
    it("should return 404", async () => {
        return request(app)
        .get("/v1/seller/order/100")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .then((res) => {
            expect(res.status).toBe(404);
        });
    });
});
describe("PUT /v1/seller/order/product/status/:id", () => {
    // update status avaibility to unavailable
    it("should return 200 OK", async () => {
        return request(app)
        .put("/v1/seller/order/product/status/1")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
            status: "unavailable"
        })
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.Orders).toBeDefined();
        });
    });
});