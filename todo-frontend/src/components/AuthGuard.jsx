import React from "react";
import { Box } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const AuthGuard = (props) => {
    // TODO: Implement AuthGuard for pages
    return (
        <>
            <Header />
            <Box sx={{ display: "flex", flex: 1 }}>
                {props.children}
            </Box>
            <Footer />
        </>
    )
};

export default AuthGuard;
