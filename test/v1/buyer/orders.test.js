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
describe("POST /v1/buyer/order/buy", () => {
    it("should return 200 OK", async () => {
        return request(app)
        .post("/v1/buyer/order/buy")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
            
        })
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.Orders).toBeDefined();
        });
    });
});