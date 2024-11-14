import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App";
import "./index.css";

const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#000C", // Change this to your desired color
      },
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
        <ThemeProvider theme={darkTheme}>
            <RecoilRoot>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </RecoilRoot>
        </ThemeProvider>

    </React.Fragment>
);