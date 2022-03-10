import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {TodoItem} from "../types/TodoItem";
import {
    AppBar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Fab,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import {ArrowBack, Delete, Edit} from "@mui/icons-material";

const Detail = () => {

    const emptyTodoItem: TodoItem = {
        id: "",
        title: "",
        description: "",
        isComplete: false
    }

    const [todoItemList, setTodoItemList] = useState(Array<TodoItem>())
    const [todoItem, setTodoItem] = useState<TodoItem>(emptyTodoItem)
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.todoItemListData) {
            const data = JSON.parse(localStorage.todoItemListData) as Array<TodoItem>
            setTodoItemList(data)
            const item = data.find((item) => item.id === params.id)
            setTodoItem(item ? item : emptyTodoItem)
        }
    }, [])

    const handleDeleteDialogAcceptClick = () => {
        const data = todoItemList.filter((item) => item.id != params.id)
        localStorage.setItem("todoItemListData", JSON.stringify(data))
        navigate("/")
    }

    const handleEditButtonClick = () => {
        navigate(`/edit/${params.id}`)
    }

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoItem({...todoItem, isComplete: e.target.checked})
        const data = todoItemList.map((item) => (
            {
                id: item.id,
                title: item.title,
                description: item.description,
                isComplete: item.id === todoItem.id ? e.target.checked : item.isComplete
            }
        ))
        localStorage.setItem("todoItemListData", JSON.stringify(data))
        setTodoItemList(data)
    }

    const handleDeleteButtonClick = () => {
        setOpenDeleteDialog(true)
    }

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false)
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
                        <ArrowBack/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>Detail</Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleDeleteButtonClick}
                    >
                        <Delete/>
                    </IconButton>
                    <Dialog
                        open={openDeleteDialog}
                        onClose={handleDeleteDialogClose}
                    >
                        <DialogContent>
                            <DialogContentText>Delete task?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                            <Button onClick={handleDeleteDialogAcceptClick}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
            <Box sx={{margin: "0 auto", maxWidth: "700px"}}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={todoItem.isComplete}
                                              onChange={handleCheckBoxChange}/>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        {todoItem.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {todoItem.description}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="flex-end" sx={{margin: "10px"}}>
                    <Fab color="primary" onClick={handleEditButtonClick}>
                        <Edit/>
                    </Fab>
                </Box>
            </Box>
        </Box>
    )
}

export default Detail