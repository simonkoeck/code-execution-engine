"use strict";

import { platform, tmpdir } from "os";
import { writeFileSync, unlinkSync, mkdirSync, readFileSync } from "fs";
import { exec } from "child_process";
import { Language, Environment } from "./constants";
import path from "path";

const uniqueFilename = require("unique-filename");

function parseEnvironment(platform: string): Environment {
  if (platform === "win32") {
    return Environment.WIN;
  } else {
    return Environment.UNIX;
  }
}

/**
 *
 * @param input The code that should be executed
 * @param language Language of the input parameter
 * @returns Result of the code
 */
export default async function execute(
  input: string,
  language: Language
): Promise<string> {
  // Check Platform
  const env = parseEnvironment(platform());

  // Write File to temp folder
  var temppath: string = uniqueFilename(tmpdir());
  if (language == Language.C) temppath += ".c";
  else if (language == Language.BATCH) temppath += ".bat";
  else if (language == Language.CPP) temppath += ".c";
  else if (language == Language.GO) temppath += ".go";
  writeFileSync(temppath, input, { encoding: "utf-8" });

  // Command to execute runner
  var command = env === Environment.WIN ? "" : "sh";

  // Filetype of runner
  var filetype = env === Environment.WIN ? "bat" : "sh";

  // Path to runner file
  var runnerpath = path.join(
    __dirname,
    "..",
    "runners",
    env,
    `${language}.${filetype}`
  );

  // Execute code
  return new Promise<string>((resolve, reject) => {
    exec(`${command} ${runnerpath} ${temppath}`, (err, stdout, stderr) => {
      // Delete created file
      unlinkSync(temppath);

      if (stderr) {
        // Remove newline from stderr
        if (stderr.endsWith("\n")) stderr = stderr.slice(0, -1);
        return reject(stderr);
      }

      // Remove newline from stdout
      if (stdout.endsWith("\n")) stdout = stdout.slice(0, -1);

      resolve(stdout);
    });
  });
}
