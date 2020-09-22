import nock, { Scope } from "nock";
import { resolve } from "path";

export interface IMockRepository {
  getJSMocks(): string[];
}

export default class RegisterMock {
  repo: IMockRepository;
  nockScope: Scope;

  constructor(repo: IMockRepository, nockScope: Scope) {
    this.repo = repo;
    this.nockScope = nockScope;
  }

  async register() {
    const mocks = this.repo.getJSMocks();

    for (const mock of mocks) {
      const filePath = resolve(process.cwd(), mock)
      process.stdout.write(`\n Loading file ${filePath}`)
      import(filePath).then((module) => {
        const fn = module.default || module;

        fn(this.nockScope, nock);
      });
    }
  }
}
