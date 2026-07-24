import http from "node:http";
import { createExpress } from "./app/app.js";

import "dotenv/config";
import { connectDB } from "./db/connection.js";

async function main() {
  const httpServer = http.createServer(createExpress());

  const PORT: Number = Number(process.env.PORT) || 3000;

  connectDB()
    .then(() => {
      httpServer.listen(PORT, () => {
        console.log(`Server is Up and Running at PORT: ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(`Server Crashed ${err}`);
    });
}

main();
