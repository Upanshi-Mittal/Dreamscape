import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Final from './pages/final';
import RefereshHandler from './pages/refereshhandler';
import { useState } from 'react';
import Blog from './pages/Blog';

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">

      {/* Sets auth state on refresh if token exists */}
      <RefereshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Blog" element={<Blog />}/>
        <Route
          path="/final"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Final />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
