import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helpers";
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
  AddAccount,
} from "./signup-protocol";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "password_confirmation",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, password_confirmation } = httpRequest.body;

      if (password !== password_confirmation) {
        return badRequest(new InvalidParamError("password_confirmation"));
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError("email"));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}