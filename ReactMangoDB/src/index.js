import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';
import AddBug from './Pages/AddBug';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import ViewBug from './Pages/ViewBug';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          {/*home page*/}
          <Route index element={<Home/>}/>
          {/*add user page*/}
          <Route path={'user'} element={<AddUser/>}/>
          {/*add/edit bug page*/}
          <Route path={'bug'} element={<AddBug/>}/>
          <Route path={'bug/:id'} element={<AddBug/>}/>
          {/*view bug detail page*/}
          <Route path={'view/:id'} element={<ViewBug/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
