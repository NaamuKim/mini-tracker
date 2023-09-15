import app from "@/app";
import prisma from "@/config/db";

const port = 8080;

const server = app.listen(port, () => {
  console.log(`mini-tracker-api-server listening on port ${port}`);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Closing server...");
  server.close(async (err) => {
    if (err) {
      console.error("Failed to close server", err);
      process.exit(1);
    } else {
      await prisma.$disconnect();
      console.log("Server closed.");
      process.exit(0);
    }
  });
});
