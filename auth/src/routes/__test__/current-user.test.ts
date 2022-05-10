import request from "supertest";
import { app } from "../../app";

const SIGNUP_URL = "/api/users/signup";
const CURRENT_USER_URL = "/api/users/currentuser";

it("responds with details about the current user", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .get(CURRENT_USER_URL)
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app).get(CURRENT_USER_URL).send().expect(200);

  expect(response.body.currentUser).toEqual(null);
});
