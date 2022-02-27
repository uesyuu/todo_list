import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {BarChart, ChevronLeft, FormatListBulleted, Menu as MenuIcon} from "@mui/icons-material";
import {TodoItem} from "../types/TodoItem";
import {useNavigate} from "react-router-dom";

const Statistics = () => {

    const [todoItemList, setTodoItemList] = useState(Array<TodoItem>())
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.todoItemListData) {
            const data = JSON.parse(localStorage.todoItemListData) as Array<TodoItem>
            setTodoItemList(data)
        }
    }, [])

    const handleDrawerOpen = () => {
        setOpenDrawer(true)
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false)
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>Statistics</Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={openDrawer} onClose={handleDrawerClose}>
                <IconButton onClick={handleDrawerClose} sx={{display: "flex", justifyContent: "flex-end"}}>
                    <ChevronLeft/>
                </IconButton>
                <Divider/>
                <List>
                    <ListItem onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <FormatListBulleted/>
                        </ListItemIcon>
                        <ListItemText primary="To-Do List"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <BarChart/>
                        </ListItemIcon>
                        <ListItemText primary="Statistics"/>
                    </ListItem>
                </List>
            </Drawer>
            <Box display="flex" flexDirection="column" sx={{margin: "0 auto", maxWidth: "700px"}}>
                <Typography variant="body1">Active
                    tasks: {todoItemList.filter((item) => !item.isComplete).length}</Typography>
                <Typography variant="body1">Completed
                    tasks: {todoItemList.filter((item) => item.isComplete).length}</Typography>
            </Box>
        </Box>
    )
}

export default Statistics