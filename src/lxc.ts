"use strict";

import { exec } from "child_process";
import { mkdirSync, writeFileSync, readFileSync, chmodSync } from "fs";
import { platform } from "os";
import { Language } from "./constants";

class LXC {
  LXC_ROOT_FS: string;

  constructor(container: string) {
    // Check OS
    const os = platform();
    if (os !== "linux") {
      throw {
        name: "UnsupportedOSError",
        message: "LXCs only work on linux machines",
      };
    }

    this.LXC_ROOT_FS = `${process.env.HOME}/.local/share/lxc/${container}/rootfs`;
    // Check if Container exists
    exec(
      `bash ${__dirname}/../runners/lxc/lxc-check-container.bash ${container}`,
      (err, stdout, stderr) => {
        if (stdout === "")
          throw {
            name: "LXCContainerNotFound",
            message: "Your specified LXC-Container couldn't be found.",
          };
      }
    );
  }

  /**
   * Run this function the first time, after installing the container
   */
  init() {
    try {
      // Copy .sh file to correct location
      const shFile = readFileSync(
        `${__dirname}/../runners/lxc/lxc-init.bash`,
        "utf-8"
      );
      writeFileSync(`${this.LXC_ROOT_FS}/tmp/lxc-init.bash`, shFile);

      exec(`chmod +x ${this.LXC_ROOT_FS}/tmp/lxc-init.bash`);
    } catch (e) {
      throw e;
    }

    return new Promise<string>((resolve, reject) => {
      exec(
        `lxc-attach --clear-env -n cee -- bash /tmp/lxc-init.bash`,
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

  execute(input: string, language: Language) {
    const id = new Date().getTime() + "_" + Math.floor(Math.random() * 10000);

    try {
      mkdirSync(`${this.LXC_ROOT_FS}/tmp/${id}`);
      writeFileSync(`${this.LXC_ROOT_FS}/tmp/${id}/code.code`, input);

      // Copy .sh file to correct location
      const shFile = readFileSync(
        `${__dirname}/../runners/unix/${language}.sh`,
        "utf-8"
      );
      writeFileSync(`${this.LXC_ROOT_FS}/tmp/${id}/runner.sh`, shFile);

      exec(`chmod +x ${this.LXC_ROOT_FS}/tmp/${id}/runner.sh`);
    } catch (e) {
      throw e;
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
