import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
console.log(dns.getServers());

import "dotenv/config";
import app from "./app.js";
import connectDB from "./lib/db.js";

const port = process.env.PORT || 8000;

await connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
