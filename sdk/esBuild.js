const esbuild = require("esbuild");
const process = require("process");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/mini-tracker-sdk.js",
    bundle: true,
    sourcemap: false,
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URI": JSON.stringify(process.env.API_URI),
    },
  })
  .then(() => console.log("⚡Bundle build complete ⚡"))
  .catch(() => {
    process.exit(1);
  });
