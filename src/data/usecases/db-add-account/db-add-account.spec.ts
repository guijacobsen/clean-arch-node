import { DbAddAccount } from "./db-add-account";

describe("DbAddAccount Usecase", () => {
  test("shoud call Encrypter with correct password", async () => {
    class EncryptStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
      }
    }
    const encrypterSub = new EncryptStub();
    const sut = new DbAddAccount(encrypterSub);
    const encrypterSpy = jest.spyOn(encrypterSub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    await sut.add(accountData);
    expect(encrypterSpy).toHaveBeenCalledWith("valid_password");
  });
});
