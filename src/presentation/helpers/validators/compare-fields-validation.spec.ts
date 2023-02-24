import { InvalidParamError } from "../../errors";
import { CompareFieldsValidation } from "./compare-fields-validation";

const makeSut = (): CompareFieldsValidation =>
  new CompareFieldsValidation("field", "fieldToCompare");

describe("CompareFieldsValidation", () => {
  test("should return a InvalidParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "value",
      fieldToCompare: "otherValue",
    });
    expect(error).toEqual(new InvalidParamError("fieldToCompare"));
  });

  test("should not return if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "field",
      fieldToCompare: "field",
    });
    expect(error).toBeFalsy();
  });
});
