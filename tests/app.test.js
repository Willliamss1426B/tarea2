const request = require("supertest");
const app = require("../src/app");

test("GET / responde correctamente", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.body.mensaje).toBe("App web funcionando");
});
