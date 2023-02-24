import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helpers";
import { HttpRequest } from "../../protocols";
import { EmailValidator } from "../signup/signup-protocol";
import { LoginController } from "./login";

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

interface SutTypes {
  sut: LoginController;
  emailValidatorStub: EmailValidator;
}
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new LoginController(emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe("Login Controller", () => {
  test("should return 400 if no email is provided", async () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        password: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("should return 400 if no password is provided", async () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        email: "any_email",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });

  test("should call EmailValidator with correct values", async () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest: HttpRequest = {
      body: {
        email: "any_email",
        password: "any_password",
      },
    };

    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenLastCalledWith("any_email");
  });

  test("should return 400 if an invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValue(false);

    const httpRequest: HttpRequest = {
      body: {
        email: "invalid_email",
        password: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new InvalidParamError("email")));
  });
});
