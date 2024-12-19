import { Response } from "express";
import { HttpStatusCode } from "../enum/http-status-code";
import { HttpStatusMessage } from "../enum/http-status-message";
import HttpException from "../exception/http-exception";

export const writeResponse = <Data>(
  response: Response,
  status: number,
  message: string,
  data: Data | null,
) => {
  response.status(status).json({
    message,
    data,
  });
};

export const httpErrorHandler = (response: Response, error: unknown) => {
  if (error instanceof Error) console.log(error.message);

  if (error instanceof HttpException)
    return writeResponse(
      response,
      error.getStatusCode(),
      error.getMessage(),
      null,
    );

  writeResponse(
    response,
    HttpStatusCode.InternalServerError,
    HttpStatusMessage[HttpStatusCode.InternalServerError],
    null,
  );
};
