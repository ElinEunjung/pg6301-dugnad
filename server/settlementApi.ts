import express from "express";
export const settlementApi = express.Router();

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>;
}

const sampleSettlements: Settlement[] = [
  { id: 0, department: "furniture", balance: { "1000kr": 3, "2000kr": 80 } },
  { id: 1, department: "cafeteria", balance: { "100kr": 50, "50kr": 60 } },
];

function timeout(millis: number, simulateError = false): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error("Something went wrong"));
      } else {
        resolve();
      }
    }, millis);
  });
}

settlementApi.get("/api/settlements", async (req, res) => {
  await timeout(1500);
  if (req.query.simulateError === "true") {
    res.sendStatus(400);
  } else {
    res.json(sampleSettlements);
  }
});

settlementApi.post("/api/settlements", async (req, res) => {
  const newSettlement = {
    id: sampleSettlements.length,
    department: req.body.department,
    balance: req.body.balance,
  };
  sampleSettlements.push(newSettlement);
  res.sendStatus(201);
});
