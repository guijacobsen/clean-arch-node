import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helpers";
import { HttpRequest } from "../../protocols";
import { LoginController } from "./login";

describe("Login Controller", () => {
  test("should return 400 if no email is provided", async () => {
    const sut = new LoginController();

    const httpRequest: HttpRequest = {
      body: {
        password: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });
});
