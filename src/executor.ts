import { platform, tmpdir } from "os";
import { writeFileSync, unlinkSync } from "fs";
import { exec } from "child_process";
import Language from "./languages";
import { sync as commandExists } from "command-exists";
const uniqueFilename = require("unique-filename");

interface ISecurity {
  enabled?: boolean;
  uselxc?: boolean;
  timeout?: number;
}

interface IOptions {
  security: ISecurity;
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

  // Check if Command Exists
  if (!commandExists(language)) {
    throw new Error("This language is not installed on the machine");
  }

  // Write File to temp folder
  var filepath: string = uniqueFilename(tmpdir());
  if (language == Language.C) filepath += ".c";
  writeFileSync(filepath, input, { encoding: "utf-8" });

  // Execute code
  return new Promise<string>((resolve, reject) => {
    exec(
      `sh ${__dirname}/../runners/${os}/${language}.sh ${filepath}`,
      (err, stdout, stderr) => {
        // Delete created file
        unlinkSync(filepath);

        if (stderr) return reject(stderr);
        resolve(stdout);
      }
    );
  });
}
