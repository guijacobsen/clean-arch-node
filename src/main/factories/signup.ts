import { DbAddAccount } from "../../data/usecases/db-add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/db/db/mongodb/account-repository/account";
import { SignUpController } from "../../presentation/controllers/signup/signup";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepository);
  return new SignUpController(emailValidatorAdapter, dbAddAccount);
};
