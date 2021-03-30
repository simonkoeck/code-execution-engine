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

export const defaultExecutionTimeout = 5;

export interface ILxcInitOptions {
  runners?: number;
  maxProcesses?: number;
  maxFiles?: number;
}

export const defaultLxcInitOptions: ILxcInitOptions = {
  runners: 100,
  maxProcesses: 64,
  maxFiles: 2048,
};
