import React, { useState } from "react";
import {
    Alert,
    Container,
    Typography,
    Button,
    TextField,
    Paper,
    List,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import TodoItem from "@components/TodoItem";
import useApi from "@hooks/useApi";
import { getTasks, addTask, deleteTask, updateTask } from "@api/todoApi";

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const {
        isPending: isFetching,
        error,
        data: todos,
        setData: setTodos
    } = useApi(getTasks, [], true);
    const { isPending: isAdding, callApi: callAddTask } = useApi(addTask);
    const { callApi: callDeleteTask } = useApi(deleteTask);
    const { callApi: callUpdateTask } = useApi(updateTask);

    const handleAdd = async () => {
        // TODO: replace validation using yup.
        if (!inputValue.trim()) return;

        const newTodo = {
            id: Date.now(),
            name: inputValue,
            isCompleted: false,
        };

        const _todo = await callAddTask(newTodo);
        if (_todo) {
            setTodos([...todos, _todo]);
            setInputValue("");
        }
    };

    const handleDelete = async (id) => {
        const deletedTask = await callDeleteTask(id);
        console.log(deletedTask);
        if (deletedTask) {
            setTodos(todos.filter((_todo) => _todo._id !== deletedTask._id));
        }
    };

    const handleUpdate = async (updatedTask) => {
        const _updated = await callUpdateTask(updatedTask);
        console.log("updated", updatedTask, _updated)
        if (_updated) {
            setTodos(todos.map((_todo) => _todo._id === _updated._id ? _updated : _todo));
        }
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom mt={3}>
                TODO List
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
                <TextField
                    label="Input your task here.."
                    variant="outlined"
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    sx={{ mt: 2, minWidth: 118 }}
                >
                    {isAdding ? <CircularProgress size={24} /> : "Add a Task"}
                </Button>
            </Paper>

            {isFetching
                ? (<CircularProgress />)
                : (
                    <>
                        {todos?.length > 0 ? (
                            <List>
                                {todos.map((todo) => (
                                    <TodoItem
                                        key={todo._id}
                                        item={todo}
                                        onUpdate={handleUpdate}
                                        onDelete={handleDelete}
                                    ></TodoItem>
                                ))}
                            </List>
                        ) : (
                            <p>There is no Task.</p>
                        )}
                    </>
                )}
        </Container>
    );
};

export default Todo;
