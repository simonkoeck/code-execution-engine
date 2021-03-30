import { Environment } from "../constants";

export function parseEnvironment(platform: string): Environment {
  if (platform === "win32") {
    return Environment.WIN;
  } else {
    return Environment.UNIX;
  }
}
