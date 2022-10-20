import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Topstories from "./Components/pages/topstories";
import New from "./Components/pages/new";
import Search from "./Components/pages/search";





const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path='/' element={<Navigate to='/home'></Navigate>}></Route>
      <Route path="/home" element={<Topstories/>}></Route>
      <Route path='/new' element={<New/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;
