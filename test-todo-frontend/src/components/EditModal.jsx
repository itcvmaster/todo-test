// src/components/EditModal.js
import React, { useState, useContext } from "react";
import { Modal, Button, TextField } from "@mui/material";
import { TodoContext } from "../context/TodoContext";

const EditModal = ({ selectedTodo, setSelectedTodo }) => {
    const [newTask, setNewTask] = useState("");
    const { editTodo } = useContext(TodoContext);

    const handleEdit = () => {
        editTodo(selectedTodo.id, newTask);
        setSelectedTodo(null);
    };

    return (
        <Modal open={!!selectedTodo} onClose={() => setSelectedTodo(null)}>
            <div
                style={{
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    maxWidth: "400px",
                    margin: "auto",
                    marginTop: "100px"
                }}
            >
                <h2>Edit Todo</h2>
                <TextField
                    fullWidth
                    label="Task"
                    value={newTask || (selectedTodo ? selectedTodo.task : "")}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default EditModal;
