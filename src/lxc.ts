import { exec } from "child_process";
import commandExists from "command-exists";
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { platform } from "os";
import Language from "./languages";

class LXC {
  private _OS: string;
  LXC_ROOT_FS: string;

  constructor(container: string) {
    // Check OS
    const os = platform();
    if (os !== "linux") {
      throw new Error("Your OS don't support LXCs.");
    }
    // Check if LXC is installed
    if (!commandExists("lxc-attach")) {
      throw new Error("LXC is not installed on your system.");
    }
    this._OS = os;
    this.LXC_ROOT_FS = "";
    // Check if Container exists
    exec(
      `bash ${__dirname}/../runners/lxc/lxc-check-container.bash ${container}`,
      (err, stdout, stderr) => {
        if (err || stderr)
          throw new Error(
            `Container with the name "${container}" was not found on your system.`
          );
      }
    );
  }

  execute(input: string, language: Language) {
    if (this._OS !== "linux") throw new Error("Your OS doesn't support LXC.");

    const id = new Date().getTime() + "_" + Math.floor(Math.random() * 10000);

    try {
      mkdirSync(`${this.LXC_ROOT_FS}/tmp/${id}`);
      writeFileSync(`${this.LXC_ROOT_FS}/tmp/${id}/code.code`, input);

      // Copy .sh file to correct location
      const shFile = readFileSync(
        `${__dirname}/../runners/${this._OS}/${language}.sh`,
        "utf-8"
      );
      writeFileSync(`${this.LXC_ROOT_FS}/tmp/${id}/runner.sh`, shFile);
    } catch (e) {
      throw new Error("LXC is not installed on your machine.");
    }

    return new Promise<string>((resolve, reject) => {
      exec(
        `bash ${__dirname}/../runners/lxc/lxc-execute.bash ${id}`,
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
}

export default LXC;
