import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar style={{ display: "flex", }}>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    TODO
                </Typography>
                <Container>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/todo">Todo</Button>
                </Container>
                <Button color="inherit" component={Link} to="/login">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;