"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.amr2mp3 = undefined;

var _child_process = require("child_process");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _ffmpegStatic = require("ffmpeg-static");

var _ffmpegStatic2 = _interopRequireDefault(_ffmpegStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var amr2mp3 = exports.amr2mp3 = function amr2mp3(filepath) {
  var outputDir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "./src/mp3";
  var outputName = arguments[2];

  return new Promise(function (resolve, reject) {
    var _path$parse = _path2.default.parse(filepath),
        ext = _path$parse.ext,
        filename = _path$parse.name;

    if (ext.toLocaleLowerCase() != ".amr") {
      console.log(filepath + " is not a .amr file");
      reject(new Error(filepath + " is not a .amr file"));
      return;
    }
    var _outputName = outputName || filename;
    var cmdStr = _ffmpegStatic2.default + " -y -i \"" + _path2.default.normalize(filepath) + "\" -acodec libmp3lame -ar 24000 -vol 500 -ab 128 \"" + _path2.default.join(outputDir, _outputName + ".mp3") + "\"";
    console.log(cmdStr);
    (0, _child_process.exec)(cmdStr, function (err, stdout, stderr) {
      if (err) {
        reject(new Error("error:" + stderr));
      } else {
        resolve(outputDir + "/" + _outputName + ".mp3");
      }
    });
  });
};