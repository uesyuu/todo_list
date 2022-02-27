import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TodoItem} from "../types/TodoItem";
import {v4} from 'uuid';
import {AppBar, Box, Fab, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {ArrowBack, Done} from "@mui/icons-material";

const Add = () => {

    const [todoItemList, setTodoItemList] = useState(Array<TodoItem>())
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.todoItemListData) {
            const data = JSON.parse(localStorage.todoItemListData) as Array<TodoItem>
            setTodoItemList(data)
        }
    }, [])

    const handleTitleTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescriptionTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleAddSubmitClick = () => {
        const item: TodoItem = {
            id: v4(),
            title: title,
            description: description,
            isComplete: false,
        }
        const data: Array<TodoItem> = [...todoItemList, item]
        localStorage.setItem("todoItemListData", JSON.stringify(data))
        navigate("/")
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
                        <ArrowBack/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>New To-Do</Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{margin: "0 auto", maxWidth: "700px"}}>
                <Box display="flex" flexDirection="column">
                    <TextField label="Title" onChange={handleTitleTextBoxChange}
                               sx={{margin: "10px", maxWidth: "300px"}}/>
                    <TextField label="Description" onChange={handleDescriptionTextBoxChange}
                               sx={{margin: "10px", maxWidth: "300px"}}/>
                </Box>
                <Box display="flex" justifyContent="flex-end" sx={{margin: "10px"}}>
                    <Fab color="primary" onClick={handleAddSubmitClick}>
                        <Done/>
                    </Fab>
                </Box>
            </Box>
        </Box>
    )
}

export default Add