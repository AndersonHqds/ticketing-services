import request from "supertest";
import { app } from "../../app";

const SIGN_URL = "/api/users/signin";
const SIGNUP_URL = "/api/users/signup";
const SIGNOUT_URL = "/api/users/signout";

it("clears the cookie after signin out", async () => {
  await request(app)
    .post(SIGNUP_URL)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app).post(SIGNOUT_URL).send({}).expect(200);

  expect(response.get("Set-Cookie")[0]).toBe(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
