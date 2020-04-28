import React from "react";
import ReactComponent from "./reactComponent";
import HookComponent from "./hookComponent";
import { Hello } from "./tsComponent.tsx";
import { TestContext } from "./context";
import "./style.css";

export default class App extends React.Component {
  render() {
    return (
      <TestContext.Provider value="test">
        <div className="app_wrap">
          {/* react component */}
          <ReactComponent />
          {/* ts */}
          <Hello compiler="TypeScript" framework="React" />
          {/* Hook */}
          <HookComponent />
        </div>
      </TestContext.Provider>
    );
  }
}
