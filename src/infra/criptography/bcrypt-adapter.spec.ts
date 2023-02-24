import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(value: string): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
  async compare(value: string, hash: string): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("should call hash method with correct values", async () => {
    const sut = makeSut();

    const hashSpy = jest.spyOn(bcrypt, "hash");

    await sut.hash("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("should return a valid hash on success", async () => {
    const sut = makeSut();

    const hash = await sut.hash("any_value");
    expect(hash).toBe("hash");
  });

  test("should throw is hash method throws", async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.hash("any_value");
    await expect(promise).rejects.toThrow();
  });

  test("should call compare method with correct values", async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, "compare");
    await sut.compare("any_value", "any_hash");
    expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
  });

  test("should retun true when compare method success", async () => {
    const sut = makeSut();
    const isValid = await sut.compare("any_value", "any_hash");
    expect(isValid).toBe(true);
  });

  test("should retun false when compare method fails", async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, "compare")
      .mockImplementationOnce(() => new Promise((resolve) => resolve(false)));
    const isValid = await sut.compare("any_value", "any_hash");
    expect(isValid).toBe(false);
  });

  test("should throw is compare method throws", async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, "compare")
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.compare("any_value", "any_hash");
    await expect(promise).rejects.toThrow();
  });
});
