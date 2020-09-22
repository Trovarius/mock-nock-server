import recursive from "recursive-readdir";
import fs from "fs";
import path from "path";

import { IMockRepository } from "../use-cases/register-mocks";

export default class MockRepository implements IMockRepository {
  rootPath: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  private fromDir(startPath: string, filter: string): string[] {
    if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath);
      return [];
    }

    const files = fs.readdirSync(startPath);

    return files.reduce<string[]>((prev, file) => {
      var filename = path.join(startPath, file);
      var stat = fs.lstatSync(filename);

      if (stat.isDirectory()) {
        return [...prev, ...this.fromDir(filename, filter)]; //recurse
      }

      if (filename.indexOf(filter) >= 0) {
        return [...prev, filename];
      }

      return prev;
    }, <string[]>[]);

  }

  getJSMocks(): string[] {
    return this.fromDir(this.rootPath, ".mock.js");
  }
}
