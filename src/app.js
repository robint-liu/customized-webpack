import React from "react";
import {Hello} from "./test.tsx";
import "./style.css";

export default function App() {
  return (
    <div className={"app_wrap"}>
      <Hello compiler="TypeScript" framework="React"/>
    </div>
  );
}
