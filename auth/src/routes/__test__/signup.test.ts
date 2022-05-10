import request from "supertest";
import { app } from "../../app";

const SIGNUP_URL = "/api/users/signup";

it("Returns a 201 on successful signup", async () => {
  return request(app)
    .post(SIGNUP_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("Returns a 400 with an invalid email", async () => {
  return request(app)
    .post(SIGNUP_URL)
    .send({
      email: "asdasd",
      password: "p",
    })
    .expect(400);
});

it("Returns a 400 with an invalid password", async () => {
  return request(app)
    .post(SIGNUP_URL)
    .send({
      email: "asdasd",
      password: "password",
    })
    .expect(400);
});

it("Returns a 400 with missing email and password", async () => {
  await request(app)
    .post(SIGNUP_URL)
    .send({ email: "email@test.com" })
    .expect(400);
  await request(app).post(SIGNUP_URL).send({ password: "asdasda" }).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post(SIGNUP_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post(SIGNUP_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post(SIGNUP_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
