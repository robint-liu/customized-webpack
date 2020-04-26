#!/usr/bin/env node

/*
* 获取命令相关参数，开辟子进程，调用对应script文件
*/

"use strict";

const script = process.argv[2];
const { spawnSync } = require('child_process');

switch (script) {
  case "start":
    /*spawnSync("webpack-dev-server", ["--config", require.resolve("../scripts/"+script)],{
      stdio:"inherit"
    });
    break;*/
  case "build":
    spawnSync("node", [require.resolve("../scripts/"+script)],{
      stdio:"inherit"
    });
    break;
  default:
    console.log(`Unknown script ${script}.`);
    break;
}
