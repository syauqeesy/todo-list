import mysql, { Pool, PoolConnection } from "mysql2/promise";

class Database {
  private poolConnection!: Pool;

  private host: string;
  private port: number;
  private user: string;
  private password: string;
  private database: string;

  public constructor(
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
  ) {
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.database = database;
  }

  public start(): void {
    this.poolConnection = mysql.createPool({
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database,
      connectionLimit: 5,
    });
  }

  public async stop(): Promise<void> {
    if (!this.poolConnection) throw new Error("connection pool is not started");

    await this.poolConnection.end();
  }

  public async getConnection(): Promise<PoolConnection> {
    if (!this.poolConnection) throw new Error("connection pool is not started");

    return this.poolConnection.getConnection();
  }

  public async withConnection<Result>(
    execute: (poolConnection: PoolConnection) => Promise<Result>,
  ): Promise<Result> {
    const connection = await this.poolConnection.getConnection();
    try {
      return await execute(connection);
    } finally {
      connection.release();
    }
  }
}

export default Database;
