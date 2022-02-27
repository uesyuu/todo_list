import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import Detail from "./containers/Detail";
import Add from "./containers/Add";
import Edit from "./containers/Edit";
import Statistics from "./containers/Statistics";


function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="detail" element={<Detail/>}>
                    <Route path=":id" element={<Detail/>}/>
                </Route>
                <Route path="/add" element={<Add/>}/>
                <Route path="/edit" element={<Edit/>}>
                    <Route path=":id" element={<Edit/>}/>
                </Route>
                <Route path="/stats" element={<Statistics/>}/>
                <Route path="*" element={
                    <Navigate to="/"/>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
