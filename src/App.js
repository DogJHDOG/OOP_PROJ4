import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter 추가

import Main from './pages/Main';
import Example from './pages/Example';
import Login from './pages/Login';
import CreatePage from './pages/CreatePage';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/login' element={<Login/>}/>
          <Route path="/1" element={<Example/>}/>
          <Route path="/:tag/:num" element={<CreatePage></CreatePage>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
