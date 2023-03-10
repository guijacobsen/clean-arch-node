import { InvalidParamError, MissingParamError } from "../../errors";
import { Validation } from "../../protocols/validation";
import { ValidationComposite } from "./validation-composite";

interface SutTypes {
  sut: ValidationComposite;
  validationStubs: Validation[];
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()];
  const sut = new ValidationComposite(validationStubs);

  return {
    sut,
    validationStubs,
  };
};

describe("ValidationComposite", () => {
  test("should return an error if any validation fails", () => {
    const { sut, validationStubs } = makeSut();

    jest
      .spyOn(validationStubs[0], "validate")
      .mockReturnValue(new MissingParamError("field"));

    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("should return the first error if more than one validation fails", () => {
    const { sut, validationStubs } = makeSut();

    jest.spyOn(validationStubs[0], "validate").mockReturnValue(new Error());
    jest
      .spyOn(validationStubs[1], "validate")
      .mockReturnValue(new MissingParamError("any_field"));

    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new Error());
  });

  test("should not return is all validations succeeds", () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: "any_value" });
    expect(error).toBeFalsy();
  });
});
