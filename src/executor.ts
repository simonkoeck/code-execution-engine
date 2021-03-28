import { platform, tmpdir } from "os";
import { writeFileSync, unlinkSync, mkdirSync, readFileSync } from "fs";
import { exec } from "child_process";
import Language from "./languages";
import path from "path";

const uniqueFilename = require("unique-filename");

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
  language: Language
): Promise<string> {
  // Check Platform
  const os = platform();
  if (os !== "win32" && os !== "linux") {
    throw Error("Your OS is not supported yet.");
  }

  // Write File to temp folder
  var temppath: string = uniqueFilename(tmpdir());
  if (language == Language.C) temppath += ".c";
  else if (language == Language.BATCH) temppath += ".bat";
  else if (language == Language.CPP) temppath += ".c";
  else if (language == Language.GO) temppath += ".go";
  writeFileSync(temppath, input, { encoding: "utf-8" });

  // Command to execute runner
  var command = os == "win32" ? "" : "sh";

  // Filetype of runner
  var filetype = os == "win32" ? "bat" : "sh";

  // Path to runner file
  var runnerpath = path.join(
    __dirname,
    "..",
    "runners",
    os,
    `${language}.${filetype}`
  );

  // Execute code
  return new Promise<string>((resolve, reject) => {
    exec(`${command} ${runnerpath} ${temppath}`, (err, stdout, stderr) => {
      // Delete created file
      unlinkSync(temppath);

      if (stderr) return reject(stderr);

      // Remove newline from stdout
      if (stdout.endsWith("\n")) stdout = stdout.slice(0, -1);

      resolve(stdout);
    });
  });
}
