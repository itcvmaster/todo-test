import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { publicRoutes, authRoutes } from "@/routes";
import { AuthGuard, GlobalAlert } from "@components";

const App = () => {
    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Routes>
                {publicRoutes.map((route) => (
                    <Route
                        path={route.path}
                        element={route.component}
                        key={route.path}
                        exact={true}
                    />
                ))}
                {authRoutes.map((route) => (
                    <Route
                        path={route.path}
                        element={
                            <AuthGuard>
                                {route.component}
                            </AuthGuard>
                        }
                        key={route.path}
                        exact={true}
                    />
                ))}
            </Routes>
            {/* <GlobalAlert /> */}
        </Box>
    );
};

export default App;
