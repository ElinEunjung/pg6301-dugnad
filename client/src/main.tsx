import React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./componants/app/application";

const root = createRoot(document.getElementById("root")!);
root.render(<Application />);
