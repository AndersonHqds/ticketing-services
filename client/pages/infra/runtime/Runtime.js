export default class Runtime {
  constructor() {}

  static isRunningInServer() {
    return typeof window === "undefined";
  }
}
