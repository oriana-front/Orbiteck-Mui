import { BrowserRouter } from "react-router-dom";
import React from "react";
import RouterApp from "./routers/RouterApp";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@emotion/react";

function App() {
  
  return (
    
       <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
   
  );
}

export default App;
