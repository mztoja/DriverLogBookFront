import React from 'react';
import './App.css';
import { Menu } from './components/common/Menu/Menu';
import {TopBar} from "./components/common/TopBar/TopBar";
import {Route, Routes} from "react-router-dom";



export const App = () => {


  return (
      <div className="App">
          <Menu/>
          <Routes>
            <Route path="/" element={
              <TopBar page="home"/>
            }/>
            <Route path="logs" element={
              <TopBar page="logs"/>
            }/>
            <Route path="days" element={
              <TopBar page="days"/>
            }/>
            <Route path="finances" element={
              <TopBar page="finances"/>
            }/>
          </Routes>
      </div>
  );
}
