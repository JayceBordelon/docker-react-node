import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import FeedPage from './pages/FeedPage';
import UserProfile from './pages/UserProfile';
import MyWork from './pages/MyWork';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/work" element={<MyWork />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
