import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import App from "./app.js"

const render = () =>
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.querySelector("#root")
  );
render();

if (module.hot) {
  module.hot.accept('./app.js', function () {
    console.log('Accepting the updated App module!');
    render();
  });
}
