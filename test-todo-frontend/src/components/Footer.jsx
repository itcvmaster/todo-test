import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <AppBar position="static" style={{ height: "100px", top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1" style={{ flexGrow: 1 }}>
          © 2024 TODO Test Application
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;