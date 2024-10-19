import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "./progressIndicator";

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>;
}

const sampleSettlements: Settlement[] = [
  { id: 0, department: "furniture", balance: { "1000kr": 3, "2000kr": 80 } },
  { id: 1, department: "cafeteria", balance: { "100kr": 50, "50kr": 60 } },
];

function timeout(millis: number, simulateError: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error("Something went wrong"));
      } else {
        resolve();
      }
    }, millis);
  });
}

function fetchSettlement(simulateError: boolean): Promise<Settlement[]> {
  return timeout(1000, simulateError).then(() => sampleSettlements);
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  async function loadSettlements(simulateError: boolean = false) {
    setLoading(true);
    setSettlements([]);
    setError(undefined);
    try {
      const settlements = await fetchSettlement(simulateError);
      setSettlements(settlements);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettlements();
  }, []);

  return (
    <>
      <h1>Dugnadsoppgjør</h1>
      {loading && <ProgressIndicator />}
      {error && <div>{error.toString()}</div>}
      {settlements.map((s) => (
        <div key={s.id}>{s.department}</div>
      ))}
      <div>
        <button onClick={() => loadSettlements()}>Refresh</button>
      </div>
      <div>
        <button onClick={() => loadSettlements(true)}>
          Refresh with error
        </button>
      </div>
    </>
  );
}
