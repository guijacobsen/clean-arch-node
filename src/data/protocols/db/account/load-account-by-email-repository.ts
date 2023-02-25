import { AccountModel } from "../../../usecases/add-account/db-account-protocols";

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>;
}
