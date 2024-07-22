import http from "http";
import https from "https";

const PLATFORMS = {
  "android-hungryheadsbaristabar.vercel.app": "android",
  default: "browser",
};

export default async (req, res) => {
  console.log(req.headers);
  const fwdHost = req.headers["x-forwarded-host"];
  const fwdProto = req.headers["x-forwarded-proto"];
  const platform = PLATFORMS[fwdHost] || PLATFORMS.default;
  const actualFile = `${fwdProto}://${fwdHost}/cordova_platforms/${platform}/${req.query.file}`;
  const _http = fwdProto === "http" ? http : https;
  console.log(actualFile);
  res.setHeader("Cache-Control", "max-age=2678400, public");
  _http.get(actualFile, (response) => response.pipe(res));
};
