import { platform, tmpdir } from "os";
import { writeFileSync } from "fs";
import { exec } from "child_process";
import Language from "./languages";
const uniqueFilename = require("unique-filename");

interface IOptions {
  security: boolean;
}

/**
 *
 * @param input The code that should be executed
 * @param language Language of the input parameter
 * @param options Options Parameter
 * @returns Result of the code
 */
export default async function execute(
  input: string,
  language: Language,
  options?: IOptions
): Promise<string> {
  // Check Platform
  const os = platform();
  if (os !== "win32" && os !== "linux") {
    throw Error("Your OS is not supported yet.");
  }

  // Write File to temp folder
  const filepath: string = uniqueFilename(tmpdir());
  writeFileSync(filepath, input, { encoding: "utf-8" });

  // Execute code
  return new Promise<string>((resolve, reject) => {
    exec(
      `sh ${__dirname}/../runners/${os}/${language}.sh ${filepath}`,
      (err, stdout, stderr) => {
        if (stderr) return reject(stderr);
        resolve(stdout);
      }
    );
  });
}
