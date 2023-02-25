import request from "supertest";
import { app } from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import { Collection } from "mongodb";
import { hash } from "bcrypt";

let accountCollection: Collection;

describe("Auth Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconect();
  });

  describe("Sign", () => {
    test("should return 200 on signup", async () => {
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

  describe("Login", () => {
    test("should return an account on success", async () => {
      const password = await hash("123", 12);
      await accountCollection.insertOne({
        name: "Guilherme",
        email: "guijacobsen@gmail.com",
        password: password,
      });

      await request(app)
        .post("/api/login")
        .send({
          email: "guijacobsen@gmail.com",
          password: "123",
        })
        .expect(200);
    });
  });
});
