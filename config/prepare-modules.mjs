/* eslint-disable */
import fs from "node:fs/promises";
import path from "node:path";

function fileExists(file) {
  return fs
    .stat(file)
    .then((stats) => stats.isFile())
    .catch(() => false);
}

function remove(arr, element) {
  const index = arr.indexOf(element);
  if (index !== -1) arr.splice(index, 1);
}

(async () => {
  const skeletonFiles = await fs.readdir("config/skeleton");

  remove(skeletonFiles, "package.json");
  const skeletonPkgJson = await fs.readFile("config/skeleton/package.json", "utf-8");

  for (const pkg of await fs.readdir("packages")) {
    const dir = path.resolve("packages", pkg);
    const json = path.resolve(dir, "package.json");

    for (const file of skeletonFiles) {
      const fromFile = path.resolve("config/skeleton", file);
      const toFile = path.resolve(dir, file);
      if (!(await fileExists(toFile))) await fs.copyFile(fromFile, toFile);
    }

    if (!(await fileExists(json))) {
      const content = skeletonPkgJson.replaceAll("skeleton", pkg);
      await fs.writeFile(json, content, "utf-8");
    }
  }
})();
