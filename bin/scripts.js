#!/usr/bin/env node

"use strict";

const script = process.argv[2];
const { spawnSync } = require('child_process');

switch (script) {
  case "start":
  case "build":
    spawnSync("node", [require.resolve("../scripts/"+script)],{
      stdio:"inherit"
    });
    break;
  default:
    console.log(`Unknown script ${script}.`);
    break;
}
