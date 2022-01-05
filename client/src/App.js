
import './App.css';
import Header from './compontents/Header/Header.js';
import Menu from './compontents/Menu/Menu.js';
import Items from './compontents/Items/Items.js';
import Aside from "./compontents/Aside/Aside.js";
import Login from "./compontents/Login/Login";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Register from "./compontents/Register/Register";

function MainApp() {
    return (
            <div className="App">
                <Header />
                <Menu />
                <Items />
                <Aside />
            </div>
    );
}

function MyLogin() {
    return (
        <div className="App">
            <Header />
            <Menu />
            <Login />
            <Aside />
        </div>
    );
}

function MyRegisration() {
    return (
        <div className="App">
            <Header />
            <Menu />
            <Register />
            <Aside />
        </div>
    );
}

function App() {
  return (
      <Router>
            <Routes>
                <Route exact path="/*" element={<MainApp/>}></Route>
                <Route path="/Login" element={<MyLogin/>}> </Route>
                <Route path="/Registration" element={<MyRegisration/>}> </Route>
            </Routes>
      </Router>
  );
}

export default App;
