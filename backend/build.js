const alias = require("esbuild-plugin-alias-path");
const path = require("path");

require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist/",
    bundle: true,
    platform: "node",
    plugins: [
      alias.aliasPath({
        alias: { "@/*": path.resolve(__dirname, "./src/") },
      }),
    ],
  })
  .then(() => console.log("⚡ Bundle build complete ⚡"))
  .catch(() => process.exit(1));
