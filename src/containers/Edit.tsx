import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {TodoItem} from "../types/TodoItem";
import {AppBar, Box, Fab, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {ArrowBack, Done} from "@mui/icons-material";

const Edit = () => {

    const [todoItemList, setTodoItemList] = useState(Array<TodoItem>())
    const [todoItem, setTodoItem] = useState<TodoItem>()
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.todoItemListData) {
            const data = JSON.parse(localStorage.todoItemListData) as Array<TodoItem>
            setTodoItemList(data)
            const item = data.find((item) => item.id === params.id)
            setTodoItem(item)
            setTitle(item ? item?.title : "")
            setDescription(item ? item?.description : "")
        }
    }, [])

    const handleTitleTextBoxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescriptionTextBoxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleEditClick = () => {
        const itemIndex = todoItemList.findIndex((item) => item.id === params.id)
        const data = todoItemList.slice()
        data[itemIndex] = {
            id: data[itemIndex].id,
            title: title,
            description: description,
            isComplete: data[itemIndex].isComplete
        }
        localStorage.setItem("todoItemListData", JSON.stringify(data))
        navigate(`/detail/${params.id}`)
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(`/detail/${params.id}`)}>
                        <ArrowBack/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>Edit To-Do</Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{margin: "0 auto", maxWidth: "700px"}}>
                <Box display="flex" flexDirection="column">
                    <TextField label="Title" value={title} onChange={handleTitleTextBoxChanged}
                               sx={{margin: "10px", maxWidth: "300px"}}/>
                    <TextField label="Description" value={description} onChange={handleDescriptionTextBoxChanged}
                               sx={{margin: "10px", maxWidth: "300px"}}/>
                </Box>
                <Box display="flex" justifyContent="flex-end" sx={{margin: "10px"}}>
                    <Fab color="primary" onClick={handleEditClick}>
                        <Done/>
                    </Fab>
                </Box>
            </Box>
        </Box>
    )
}

export default Edit