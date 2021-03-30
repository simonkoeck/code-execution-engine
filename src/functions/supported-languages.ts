import { parseEnvironment } from "./environment";
import { platform } from "os";
import { readdirSync } from "fs";
import { join } from "path";

export default function getSupportedLanguages(): string[] {
  const env = parseEnvironment(platform());
  const runnerpath = join(__dirname, "..", "..", "runners", env);
  const files = readdirSync(runnerpath);
  return files.map((file) => {
    return file.split(".")[0];
  });
}
