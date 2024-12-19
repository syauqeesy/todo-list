import { Application, Request, Response } from "express";
import { service } from "../service";
import { writeResponse, httpErrorHandler } from "../foundation/helper";
import { HttpStatusCode } from "../enum/http-status-code";
import { HttpStatusMessage } from "../enum/http-status-message";
import { CreateUserRequest } from "../type/user";

export const initHandler = (application: Application, service: service) => {
  application.post(
    "/v1/user",
    async (request: Request, response: Response): Promise<void> => {
      try {
        const body = request.body as CreateUserRequest;

        const result = await service.user.register(body);

        writeResponse(
          response,
          HttpStatusCode.OK,
          HttpStatusMessage[HttpStatusCode.OK],
          result,
        );
      } catch (error: unknown) {
        httpErrorHandler(response, error);
      }
    },
  );
};
