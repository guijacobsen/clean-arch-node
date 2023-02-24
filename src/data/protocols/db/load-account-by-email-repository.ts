import { AccountModel } from "../../usecases/db-add-account/db-account-protocols";

export interface LoadAccountByEmailRepository {
  load(email: string): Promise<AccountModel>;
}
