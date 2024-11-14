import * as Yup from "yup";
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
    Box,
} from "@mui/material";
import TodoItem from "@components/TodoItem";
import useApi from "@hooks/useApi";
import { getTasks, addTask, deleteTask, updateTask } from "@api/todoApi";

const taskSchema = Yup.object().shape({
    name: Yup.string().trim().required("Task name is required"),
    dueDate: Yup.date().required("Due date is required"),
});

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [dueDate, setDueDate] = useState("2024-11-15");

    const {
        isPending: isFetching,
        data: todos,
        setData: setTodos
    } = useApi(getTasks, [], true);
    const [errorMessage, setError] = useState();
    const { isPending: isAdding, callApi: callAddTask } = useApi(addTask);
    const { callApi: callDeleteTask } = useApi(deleteTask);
    const { callApi: callUpdateTask } = useApi(updateTask);

    const handleAdd = async () => {
        try {
            await taskSchema.validate({ name: inputValue, dueDate });

            const newTodo = {
                id: Date.now(),
                name: inputValue,
                dueDate,
                isCompleted: false,
            };

            const _todo = await callAddTask(newTodo);
            if (_todo) {
                setTodos(_todos => [..._todos, _todo]);
                setInputValue("");
                setDueDate("2024-11-15");
            }
        } catch (validationError) {
            setError(validationError.message);
        }
    };

    const handleDelete = async (id) => {
        const deletedTask = await callDeleteTask(id);
        if (deletedTask) {
            setTodos(todos.filter((_todo) => _todo._id !== deletedTask._id));
        }
    };

    const handleUpdate = async (updatedTask) => {
        const _updated = await callUpdateTask(updatedTask);
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
                <Box sx={{ display: 'flex', gap: '30px' }}>
                    <TextField
                        label="Input your task here.."
                        placeholder="Input your task here..."
                        variant="outlined"
                        fullWidth
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Due Date"
                        name="date"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        style={{ marginTop: '0' }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        sx={{ mt: 2, minWidth: 118 }}
                    >
                        {isAdding ? <CircularProgress size={24} /> : 'Add a Task'}
                    </Button>
                </Box>
            </Paper>

            {isFetching
                ? (<CircularProgress />)
                : (
                    <>
                        {todos?.length > 0 ? (
                            <TodoItem
                                items={todos}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        ) : (
                            <p>There is no Task.</p>
                        )}
                    </>
                )}
        </Container>
    );
};

export default Todo;