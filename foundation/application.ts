import express, { Application as Express, Request, Response } from "express";
import configuration, { Configuration } from "./configuration";

class Application {
  private application: Express;
  private configuration: Configuration;

  public constructor() {
    this.application = express();
    this.configuration = configuration;
  }

  public async start(): Promise<void> {
    this.application.all("", (_: Request, response: Response) => {
      response.status(404).json({
        message: "route not found",
        data: null,
      });
    });

    this.application.listen(this.configuration.application.port, () =>
      console.log(
        `server running on port ${this.configuration.application.port}`,
      ),
    );
  }
}

export default Application;
