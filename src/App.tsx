import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Feed from './pages/Feed';

import Navbar from './components/NavBar';

const App: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feed" element={<Feed />} />
            </Routes>
        </div>
    );
};

export default App;
