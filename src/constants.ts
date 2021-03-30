"use strict";

export enum Language {
  PYTHON3 = "python3",
  PYTHON2 = "python2",
  C = "gcc",
  BASH = "bash",
  BATCH = "bat",
  JAVASCRIPT = "js",
  RUBY = "ruby",
  CPP = "cpp",
  JAVA = "java",
  GO = "go",
}

export enum Environment {
  UNIX = "unix",
  WIN = "win32",
}

export interface IExecuteOptions {
  timeout?: number;
}
