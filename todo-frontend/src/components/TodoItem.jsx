import React, { useState } from "react";
import {
    ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, TableRow, TableCell,TableContainer,Table,TableHead,TableBody,TablePagination
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
const TodoItem = ({ items, onUpdate, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [rows, setRows] = React.useState(items);
    const [editItem, setEditItem] = useState([]);
   
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'dueDate', label: 'DueDate', minWidth: 200 },
        { id: 'actions', label: 'Actions', minWidth: 170 } // New actions column
    ];
    
    const handleUpdate = () => {
        onUpdate({
            ...editItem
        });
        setOpen(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={item.name}>
                                    {
    
                                        columns.map((column) => {
                                            if (column.id === "actions") {
                                                return (
                                                    <TableCell key={`${column.id}-${index}`}>
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
                                                            onClick={() => {setOpen(true); setEditItem(item)}}
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
                                                    </TableCell>
                                                );
                                            }
                                            const value = item[column.id];
                                            return(
                                            <TableCell key = {column.id} sx={{
                                                textDecoration: item.isCompleted ? "line-through" : "none"
                                            }}>
                                                {value.split('T')[0]}
                                            </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[2,5,10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
            {/*<ListItem key={item.id} dense>
                <ListItemText
                    primary={item.name}
                    sx={{
                        textDecoration: item.isCompleted ? "line-through" : "none"
                    }}
                />
                <ListItemText
                    primary={date}
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
                </ListItem>*/}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Enter New Task</DialogTitle>
                <DialogContent style={{ paddingTop: "16px" }}>
                    <TextField
                        label="Type your updated task here.."
                        fullWidth
                        value={editItem.name}
                        onChange={(e) => setEditItem({...editItem, name:e.target.value})}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Due Date"
                        name="date"
                        type="date"
                        value={editItem.dueDate ? editItem.dueDate.split("T")[0] : ''}
                        onChange={(e) => setEditItem({...editItem, dueDate:e.target.value})}
                        InputLabelProps={{ shrink: true }}
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
