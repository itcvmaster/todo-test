import React, { useState } from "react";
import {
    ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

/**
 * This component will trigger complete, update and delete events.
 * 
 * @param {object} item A task object
 * @param {function} onUpdate A function to be called to update
 * @param {function} onDelete A function to be called to be deleted
 */
const TodoItem = ({ item, onUpdate, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(item.name);

    const handleUpdate = () => {
        onUpdate({
            ...item,
            name: inputValue
        });
        setOpen(false);
    }
    return (
        <>
            <ListItem key={item.id} dense>
                <ListItemText
                    primary={item.name}
                    sx={{
                        textDecoration: item.isCompleted ? "line-through" : "none"
                    }}
                />
                <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => onUpdate({ ...item, isCompleted: !item.isCompleted })}
                >
                    <CheckIcon color={item.isCompleted ? "success" : "action"} />
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => setOpen(true)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(item._id)}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItem>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Enter New Task</DialogTitle>
                <DialogContent style={{ paddingTop: "16px" }}>
                    <TextField
                        label="Type your updated task here.."
                        fullWidth
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
};

export default TodoItem;
