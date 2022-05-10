import request from "supertest";
import { app } from "../../app";

const SIGN_URL = "/api/users/signin";
const SIGNUP_URL = "/api/users/signup";

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post(SIGN_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post(SIGNUP_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post(SIGN_URL)
    .send({
      email: "test@test.com",
      password: "passwordasdasd",
    })
    .expect(400);
});

it("responds with a cookue when given valid credentials", async () => {
  await request(app)
    .post(SIGNUP_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post(SIGN_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
