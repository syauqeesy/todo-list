import Database from "./database";

class Repository {
  protected database: Database;

  public constructor(database: Database) {
    this.database = database;
  }
}

export default Repository;
