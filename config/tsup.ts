import { packageBanner, packageEntryPoints, PackageJson } from "./npm";
import { defineConfig, Options } from "tsup";

export function tsupConfig(pkg: PackageJson, overrides?: Partial<Options> | ((options: Options) => Partial<Options>)) {
  const external = Object.keys(pkg.optionalDependencies ?? {});
  const entries = packageEntryPoints(pkg);

  return defineConfig(({ watch }) => {
    const options: Options = {
      entry: Object.fromEntries(entries),
      target: "node18",
      external,
      dts: !watch,
      minify: !watch,
      format: watch ? ["cjs"] : ["esm", "cjs"],
      sourcemap: !watch,
      onSuccess: watch ? "pnpm run start" : undefined,
      banner: { js: packageBanner(pkg) },
      clean: true,
      bundle: true,
    };

    if (typeof overrides === "object") Object.assign(options, overrides);
    else if (typeof overrides === "function") Object.assign(options, overrides(options));

    return options;
  });
}
