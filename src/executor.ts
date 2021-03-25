import { platform } from "os";

/**
 *
 * @param input The code that should be executed
 * @param language Language of the input parameter
 * @returns Result of the code
 */
export default function execute(input: string, language: number): string {
  // Check OS
  if (platform() !== "win32" && platform() !== "linux") {
    throw Error("Your OS is not supported yet.");
  }
  return "test";
}
