"use strict";

import { platform, tmpdir } from "os";
import { writeFileSync, mkdirSync, rmdirSync } from "fs";
import { exec } from "child_process";
import {
  Language,
  Environment,
  IExecuteOptions,
  defaultExecutionTimeout,
} from "../constants";
import { join } from "path";
import { parseEnvironment } from "./environment";

/**
 *
 * @param input The code that should be executed
 * @param language Language of the input parameter
 * @param args Array of command line arguments
 * @param stdin stdin of the executed code
 * @returns Stdout of the code or an exception if stderr is not empty
 */
export default async function execute(
  input: string,
  language: Language,
  args: string[] = [],
  stdin: string = "",
  options: IExecuteOptions = { timeout: defaultExecutionTimeout }
): Promise<string> {
  // Check Platform
  const env = parseEnvironment(platform());

  const id = new Date().getTime() + "_" + Math.floor(Math.random() * 10000);

  const tempFolder: string = join(tmpdir(), id);

  try {
    mkdirSync(tempFolder);
    writeFileSync(`${tempFolder}/code.code`, input);
    writeFileSync(
      `${tempFolder}/args.args`,
      env == Environment.WIN ? args.join(" ") : args.join("\n")
    );
    writeFileSync(`${tempFolder}/stdin.stdin`, stdin);
    writeFileSync(
      `${tempFolder}/timeout.timeout`,
      (options.timeout || defaultExecutionTimeout).toString()
    );
  } catch (e) {
    throw e;
  }

  var command = env === Environment.WIN ? "" : "sh";
  var filetype = env === Environment.WIN ? "bat" : "sh";

  // Path to runner file
  var runnerpath = join(
    __dirname,
    "..",
    "..",
    "runners",
    env,
    `${language}.${filetype}`
  );

  // Execute code
  return new Promise<string>((resolve, reject) => {
    // if username has a space in it
    var runcmd =
      env == Environment.WIN
        ? `${command} "${runnerpath}" ${tempFolder}`
        : `${command} ${runnerpath} ${tempFolder}`;
    // run command
    exec(runcmd, (err, stdout, stderr) => {
      // Delete created folder
      try {
        rmdirSync(tempFolder, { recursive: true });
      } catch (e) {}

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
