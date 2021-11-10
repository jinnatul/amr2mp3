import { exec } from "child_process";
import path from "path";
import ffmpegPath from "ffmpeg-static";

export const amr2mp3 = (filepath, outputDir = "./src/mp3", outputName) => {
  return new Promise((resolve, reject) => {
    const { ext, name: filename } = path.parse(filepath);
    if (ext.toLocaleLowerCase() != ".amr") {
      console.log(`${filepath} is not a .amr file`);
      reject(new Error(`${filepath} is not a .amr file`));
      return;
    }
    const _outputName = outputName || filename;
    const cmdStr = `${ffmpegPath} -y -i "${path.normalize(
      filepath
    )}" -acodec libmp3lame -ar 24000 -vol 500 -ab 128 "${path.join(
      outputDir,
      _outputName + ".mp3"
    )}"`;
    console.log(cmdStr);
    exec(cmdStr, (err, stdout, stderr) => {
      if (err) {
        reject(new Error("error:" + stderr));
      } else {
        resolve(`${outputDir}/${_outputName}.mp3`);
      }
    });
  });
};
