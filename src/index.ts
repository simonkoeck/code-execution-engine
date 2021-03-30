"use strict";

import executeFunc from "./functions/executor";
import getSupportedLanguagesFunc from "./functions/supported-languages";
import { Language } from "./constants";
import lxc from "./lxc";

export const languages = Language;
export const execute = executeFunc;
export const LXC = lxc;
export const getSupportedLanguages = getSupportedLanguagesFunc;
