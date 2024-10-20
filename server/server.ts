import express from "express";
import { settlementApi } from "./settlementApi";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://eunjungp615:1xrd0Ox2F6Gooofk@cluster0.7hibr.mongodb.net/",
);
client.connect().then(async (connection) => {
  const db = connection.db("dugnad");
  const result = await db
    .collection("settlements")
    .find({ department: "sports" })
    .toArray();
  console.log(result);
});

const app = express();
/*app.use(express.json);*/
app.use(settlementApi);
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
