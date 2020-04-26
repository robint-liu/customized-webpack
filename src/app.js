import React from "react";
import { Hello } from "./test-ts.tsx";
import MyReact from "./test-react"
import "./style.css";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>this is React 、TypeScript APP</h1>
        <MyReact />
        <Hello compiler="TypeScript" framework="React" />
      </div>
    );
  }
}
