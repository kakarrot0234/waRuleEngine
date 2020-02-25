import * as uuid from "uuid";

export class GuidProvider {

  static GetGuid (): string {
    return uuid.v1();
  }

}
