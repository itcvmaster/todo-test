import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import useAlertStore from "@components/GlobalAlert";

const Notification = ({ message, severity, onClose }) => (
    <Snackbar
        open
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={onClose}
    >
        <Alert severity={severity}>{message}</Alert>
    </Snackbar>
);

export default function GlobalAlert() {
    const { alerts, deleteAlert } = useAlertStore();

    return (
        <>
            {alerts.map(({ message, severity, id }) => (
                <Notification
                    key={id}
                    message={message}
                    severity={severity}
                    onClose={() => deleteAlert(id)}
                />
            ))}
        </>
    );
}