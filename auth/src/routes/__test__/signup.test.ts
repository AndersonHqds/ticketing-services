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
      password: "password",
    })
    .expect(400);
});
