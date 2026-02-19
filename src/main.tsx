import React from "react";
import App from "./App";
import "./App.css";
import {CursosProvider} from "./context/CursosContext";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {setupStore} from "./store";
import {CssBaseline} from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const store = setupStore()

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <StyledEngineProvider enableCssLayer>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <CssBaseline />
            <CursosProvider>
                <Provider store={store}>
                    <App/>
                </Provider>
            </CursosProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
