import express from "express";
import { settlementApi } from "./settlementApi";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env["MONGODB_URL"]!);
client.connect().then(async (connection) => {
  const db = connection.db("dugnad");
  const result = await db
    .collection("settlements")
    .find({ department: "sports" })
    .toArray();
  console.log(result);
  app.use(settlementApi(db));
});

const app = express();
/*app.use(express.json);*/

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
