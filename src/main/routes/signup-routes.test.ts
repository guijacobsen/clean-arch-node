import request from "supertest";
import { app } from "../config/app";
import { MongoHelper } from "../../infra/db/db/mongodb/helpers/mongo-helper";

describe("SignUp Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconect();
  });

  test("should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Guilherme",
        email: "guijacobsen@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      })
      .expect(200);
  });
});
