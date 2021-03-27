import { platform, tmpdir } from "os";
import { writeFileSync, unlinkSync, mkdirSync, readFileSync } from "fs";
import { exec } from "child_process";
import Language from "./languages";
import { sync as commandExists } from "command-exists";
const uniqueFilename = require("unique-filename");

interface ISecurity {
  enabled?: boolean;
  useLXC?: boolean;
  timeout?: number;
}

interface IOptions {
  security?: ISecurity;
}

const OUTPUT_LIMIT = 65535;
const LXC_ROOT_FS = "/var/lib/lxc/cee/rootfs";

/**
 *
 * @param input The code that should be executed
 * @param language Language of the input parameter
 * @param args Array of arguments to run the code
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

  // If using lxc
  if (options?.security?.useLXC == true) {
    if (os !== "linux") throw new Error("Your OS doesn't support LXC.");

    const id = new Date().getTime() + "_" + Math.floor(Math.random() * 10000);

    try {
      mkdirSync(`${LXC_ROOT_FS}/tmp/${id}`);
      writeFileSync(`${LXC_ROOT_FS}/tmp/${id}/code.code`, input);

      // Copy .sh file to correct location
      const shFile = readFileSync(
        `${__dirname}/../runners/${os}/${language}.sh`,
        "utf-8"
      );
      writeFileSync(`${LXC_ROOT_FS}/tmp/${id}/runner.sh`, shFile);
    } catch (e) {
      throw new Error("LXC is not installed on your machine.");
    }

    return new Promise<string>((resolve, reject) => {
      exec(
        `bash ${__dirname}/../runners/lxc-execute.bash ${id}`,
        (err, stdout, stderr) => {
          if (err) return reject(err);
          if (stderr) return reject(stderr);

          // Remove newline from stdout
          if (stdout.endsWith("\n")) stdout = stdout.slice(0, -1);

          resolve(stdout);
        }
      );
    });
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

        // Remove newline from stdout
        if (stdout.endsWith("\n")) stdout = stdout.slice(0, -1);

        resolve(stdout);
      }
    );
  });
}
