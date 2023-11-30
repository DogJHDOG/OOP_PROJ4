import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter 추가

import Main from './pages/Main';
import Example from './pages/Example';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/1' element={<Example/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
