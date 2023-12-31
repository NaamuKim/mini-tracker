const express = require("express");
const chokidar = require("chokidar");
const WebSocket = require("ws");
const path = require("path");
const esbuild = require("esbuild");
const child_process = require("child_process");
const process = require("process");

const app = express();
const PORT = 3000;

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected");
});

const watchSdkDir = path.join("src");

const watcher = chokidar.watch(watchSdkDir, {
  persistent: true,
});

(async () => {
  const SDKBuilder = await esbuild.context({
    bundle: true,
    outfile: path.join(process.cwd(), "dist/mini-tracker-sdk.js"),
    entryPoints: [path.join(process.cwd(), "src/index.ts")],
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URI": JSON.stringify(process.env.API_URI),
    },
    sourcemap: true,
  });
  await SDKBuilder.rebuild();

  watcher.on("change", async (filePath) => {
    console.log(`SDK File changed: ${filePath}`);
    try {
      await SDKBuilder.rebuild();
      console.log("SDK build successful.");

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send("refresh");
        }
      });
    } catch (error) {
      console.error("SDK build failed:", error);
    }
  });
})();

app.use(express.static(path.join("localServer", "pages")));
app.use("/dist", express.static(path.join("dist")));

app.server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  child_process.exec(`open http://localhost:${PORT}/1.html`);
});

app.server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
