import request from "supertest";
import { app } from "../config/app";

describe("SignUp Routes", () => {
  test("should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Guilherme",
        email: "guijacobsen@gmail.com",
        password: "123",
        password_confirmation: "123",
      })
      .expect(200);
  });
});
