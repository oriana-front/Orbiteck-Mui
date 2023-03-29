import { BrowserRouter } from "react-router-dom";
import React from "react";
import RouterApp from "./routers/RouterApp";

function App() {
  return (
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;
