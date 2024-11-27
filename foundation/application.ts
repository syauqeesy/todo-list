import express, { Application as Express, Request, Response } from "express";
import configuration, { Configuration } from "./configuration";
import { writeResponse } from "./helper";
import { HttpStatusCode } from "../enum/http-status-code";
import { HttpStatusMessage } from "../enum/http-status-message";

class Application {
  private application: Express;
  private configuration: Configuration;

  public constructor() {
    this.application = express();
    this.configuration = configuration;
  }

  public async start(): Promise<void> {
    this.application.all("", (_: Request, response: Response) =>
      writeResponse(
        response,
        HttpStatusCode.NotFound,
        HttpStatusMessage[HttpStatusCode.NotFound],
        null,
      ),
    );

    this.application.listen(this.configuration.application.port, () =>
      console.log(
        `server running on port ${this.configuration.application.port}`,
      ),
    );
  }
}

export default Application;
