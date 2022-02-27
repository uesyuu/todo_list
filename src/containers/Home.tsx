import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
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
    Divider,
    Drawer,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import {
    Add,
    BarChart,
    ChevronLeft,
    Delete,
    FilterList,
    FormatListBulleted,
    Menu as MenuIcon
} from "@mui/icons-material";

const Home = () => {

    const [todoItemList, setTodoItemList] = useState(Array<TodoItem>())
    const [filteredTodoItemList, setFilteredTodoItemList] = useState(Array<TodoItem>())
    const [filter, setFilter] = useState<Filter>("all")
    const [anchorElement, setAnchorElement] = useState<Element | null>(null)
    const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState<boolean>(false)
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

    type Filter = "all" | "active" | "completed"

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.todoItemListData) {
            const data = JSON.parse(localStorage.todoItemListData) as Array<TodoItem>
            setTodoItemList(data)
            setFilteredList(filter, data)
        }
    }, [])

    const setFilteredList = (filter: Filter, todoItemList: Array<TodoItem>) => {
        let list = Array<TodoItem>()
        switch (filter) {
            case "all": {
                list = todoItemList.slice()
                break
            }
            case "active": {
                list = todoItemList.filter((item) => !item.isComplete)
                break
            }
            case "completed": {
                list = todoItemList.filter((item) => item.isComplete)
                break
            }
        }
        setFilteredTodoItemList(list)
    }

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const itemIndex = todoItemList.findIndex((item) => item.id === e.target.value)
        const data = todoItemList.slice()
        data[itemIndex] = {
            id: data[itemIndex].id,
            title: data[itemIndex].title,
            description: data[itemIndex].description,
            isComplete: e.target.checked
        }
        localStorage.setItem("todoItemListData", JSON.stringify(data))
        setTodoItemList(data)
        setFilteredList(filter, data)
    }

    const handleFilterMenuAllClick = () => {
        setFilter("all")
        setFilteredList("all", todoItemList)
        handleFilterMenuClose()
    }

    const handleFilterMenuActiveClick = () => {
        setFilter("active")
        setFilteredList("active", todoItemList)
        handleFilterMenuClose()
    }

    const handleFilterMenuCompletedClick = () => {
        setFilter("completed")
        setFilteredList("completed", todoItemList)
        handleFilterMenuClose()
    }

    const handleFilterButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(e.currentTarget)
    }

    const handleFilterMenuClose = () => {
        setAnchorElement(null)
    }

    const handleDeleteAllButtonClick = () => {
        setOpenDeleteAllDialog(true)
    }

    const handleDeleteAllDialogClose = () => {
        setOpenDeleteAllDialog(false)
    }

    const handleDeleteAllDialogAcceptClick = () => {
        const data = Array<TodoItem>()
        localStorage.setItem("todoItemListData", JSON.stringify(data))
        setTodoItemList(data)
        setFilteredList(filter, data)
        handleDeleteAllDialogClose()
    }

    const handleDrawerOpen = () => {
        setOpenDrawer(true)
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false)
    }

    // TODO 選択されたらCheckをつける
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>To-Do List</Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleFilterButtonClick}
                    >
                        <FilterList/>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={handleDeleteAllButtonClick}
                    >
                        <Delete/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorElement}
                        open={Boolean(anchorElement)}
                        onClose={handleFilterMenuClose}
                    >
                        <MenuItem onClick={handleFilterMenuAllClick}>
                            {/*<ListItemIcon sx={{visibility: "hidden"}}>*/}
                            {/*    <Check/>*/}
                            {/*</ListItemIcon>*/}
                            <ListItemText>
                                All
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleFilterMenuActiveClick}>
                            {/*<ListItemIcon sx={{visibility: "hidden"}}>*/}
                            {/*    <Check/>*/}
                            {/*</ListItemIcon>*/}
                            <ListItemText>
                                Active
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleFilterMenuCompletedClick}>
                            {/*<ListItemIcon sx={{visibility: "hidden"}}>*/}
                            {/*    <Check/>*/}
                            {/*</ListItemIcon>*/}
                            <ListItemText>
                                Completed
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                    <Dialog
                        open={openDeleteAllDialog}
                        onClose={handleDeleteAllDialogClose}
                    >
                        <DialogContent>
                            <DialogContentText>Clear all?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteAllDialogClose}>Cancel</Button>
                            <Button onClick={handleDeleteAllDialogAcceptClick}>Clear</Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
            <Drawer open={openDrawer} onClose={handleDrawerClose}>
                <IconButton onClick={handleDrawerClose} sx={{display: "flex", justifyContent: "flex-end"}}>
                    <ChevronLeft/>
                </IconButton>
                <Divider/>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <FormatListBulleted/>
                        </ListItemIcon>
                        <ListItemText primary="To-Do List"/>
                    </ListItem>
                    <ListItem onClick={() => navigate("/stats")}>
                        <ListItemIcon>
                            <BarChart/>
                        </ListItemIcon>
                        <ListItemText primary="Statistics"/>
                    </ListItem>
                </List>
            </Drawer>
            <Box sx={{margin: "0 auto", maxWidth: "700px"}}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {filteredTodoItemList.map((item: TodoItem, index: number) =>
                                <TableRow key={index}>
                                    <TableCell padding="checkbox">
                                        <Checkbox value={item.id} checked={item.isComplete}
                                                  onChange={handleCheckBoxChange}/>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            onClick={() => navigate(`/detail/${item.id}`)}
                                        >
                                            {item.title}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="flex-end" sx={{margin: "10px"}}>
                    <Fab color="primary" onClick={() => navigate("/add")}>
                        <Add/>
                    </Fab>
                </Box>
            </Box>
        </Box>
    )
}

export default Home