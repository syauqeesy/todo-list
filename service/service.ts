import { repository } from "../repository";

class Service {
  protected repository: repository;

  public constructor(repository: repository) {
    this.repository = repository;
  }
}

export default Service;
