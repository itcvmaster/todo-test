import React, { useState } from "react";
import {
    Container,
    Typography,
    Button,
    TextField,
    Paper,
    CircularProgress,
    Box,
} from "@mui/material";
import TodoItem from "@components/TodoItem";
import useApi from "@hooks/useApi";
import { getTasks, addTask, deleteTask, updateTask } from "@api/todoApi";



const Todo = () => {
    const userSchema = Yup.Object({
        
    })
    const [inputValue, setInputValue] = useState("");
    const [inputDataValue, setInputDataValue] = useState("");
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
        if (!inputValue.trim()) {
            return;
        }
        if (!inputDataValue.trim()) return;


        const newTodo = {
            id: Date.now(),
            name: inputValue,
            dueDate: inputDataValue,
            isCompleted: false,
        };

        const _todo = await callAddTask(newTodo);
        if (_todo) {
            setTodos([...todos, _todo]);
            setInputValue("");
            setInputDataValue("");
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
                <Box
                    sx={{
                        display: 'flex',
                        gap: '30px'
                    }}
                >
                    <TextField
                        label="Input your task here.."
                        placeholder="Input your task here..."
                        variant="outlined"
                        fullWidth
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Due Date"
                        name="date"
                        type="date"
                        value={inputDataValue}
                        onChange={(e) => setInputDataValue(e.target.value)}
                        style={{ marginTop: '0' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
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
                            ></TodoItem>
                        ) : (
                            <p>There is no Task.</p>
                        )}
                    </>
                )}
        </Container>
    );
};

export default Todo;
