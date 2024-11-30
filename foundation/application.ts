import express, {
  Application as Express,
  json,
  Request,
  Response,
} from "express";
import configuration, { Configuration } from "./configuration";
import { writeResponse } from "./helper";
import { HttpStatusCode } from "../enum/http-status-code";
import { HttpStatusMessage } from "../enum/http-status-message";
import Database from "./database";
import { Server } from "http";
import { initService } from "../service";
import { initRepository } from "../repository";
import { initHandler } from "../handler";

class Application {
  private application: Express;
  private configuration: Configuration;
  private database: Database;
  private server!: Server;

  public constructor() {
    this.application = express();
    this.configuration = configuration;
    this.database = new Database(
      this.configuration.database.host,
      this.configuration.database.port,
      this.configuration.database.user,
      this.configuration.database.password,
      this.configuration.database.name,
    );
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

    this.database.start();

    const [result] = await this.database.withConnection(
      async (conn) => await conn.execute("SELECT NOW() AS THIS_MOMENT"),
    );

    console.log(result);

    this.application.use(json());

    initHandler(this.application, initService(initRepository(this.database)));

    this.server = this.application.listen(
      this.configuration.application.port,
      () =>
        console.log(
          `server running on port ${this.configuration.application.port}`,
        ),
    );

    process.on("SIGINT", () => this.stop());
    process.on("SIGTERM", () => this.stop());
  }

  private async stop(): Promise<void> {
    if (!this.server || !this.database) return;

    this.server.close((error) => {
      if (!error) console.log("server stopped");
    });

    await this.database.stop();
    console.log("database stopped");
  }
}

export default Application;
