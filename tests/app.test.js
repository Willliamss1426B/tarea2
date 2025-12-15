const request = require("supertest");
const app = require("../src/app");

test("GET /users responde 200", async () => {
  const res = await request(app).get("/users");
  expect(res.statusCode).toBe(200);
});
