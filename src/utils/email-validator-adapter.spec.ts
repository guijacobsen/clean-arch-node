import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe("EmailValidator Adapter", () => {
  test("shoud return false if validator returns false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email");
    expect(isValid).toBe(false);
  });

  test("shoud return true if validator returns true", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(true);
    const isValid = sut.isValid("valid_email");
    expect(isValid).toBe(true);
  });

  test("shoud call validator with correct email", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email");
  });
});
