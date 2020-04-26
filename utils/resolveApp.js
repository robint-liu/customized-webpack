const { join } = require("path");
module.exports = (_path) => join(process.cwd(), _path);
