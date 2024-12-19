import HttpException from "./http-exception";
import { HttpStatusCode } from "../enum/http-status-code";

export const USERNAME_ALREADY_USED = new HttpException(
  "username already used",
  HttpStatusCode.BadRequest,
);
