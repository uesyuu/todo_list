import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {TodoItem} from "../types/TodoItem";
import {AppBar, Box, Fab, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {ArrowBack, Done} from "@mui/icons-material";

const Edit = () => {

    const [todoItemList, setTodoItemList] = useState(Array<TodoItem>())
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.todoItemListData) {
            const data = JSON.parse(localStorage.todoItemListData) as Array<TodoItem>
            setTodoItemList(data)
            const item = data.find((item) => item.id === params.id)
            setTitle(item ? item?.title : "")
            setDescription(item ? item?.description : "")
        }
    }, [])

    const handleTitleTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescriptionTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleEditSubmitClick = () => {
        const data = todoItemList.map((item) => (
            {
                id: item.id,
                title: item.id === params.id ? title : item.title,
                description: item.id === params.id ? description : item.description,
                isComplete: item.isComplete
            }
        ))
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
                    <TextField label="Title" value={title} onChange={handleTitleTextBoxChange}
                               sx={{margin: "10px", maxWidth: "300px"}}/>
                    <TextField label="Description" value={description} onChange={handleDescriptionTextBoxChange}
                               sx={{margin: "10px", maxWidth: "300px"}}/>
                </Box>
                <Box display="flex" justifyContent="flex-end" sx={{margin: "10px"}}>
                    <Fab color="primary" onClick={handleEditSubmitClick}>
                        <Done/>
                    </Fab>
                </Box>
            </Box>
        </Box>
    )
}

export default Edit