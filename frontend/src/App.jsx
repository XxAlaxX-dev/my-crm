import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // Import AuthContext and AuthProvider
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import PrivateRoute from './components/PrivateRoute'; // For protected routes

function App() {
  const { user, logout } = useContext(AuthContext); // Access auth context
  
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <nav className="bg-blue-500 p-4 text-white">
            <ul className="flex space-x-4">
              {user ? (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/contacts">Contacts</Link></li>
                  <li><Link to="/tasks">Tasks</Link></li>
                  <li><Link to="/notes">Notes</Link></li>
                  <li><button onClick={logout} className="bg-red-500 p-2 rounded">Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
          <div className="container mx-auto mt-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes (only accessible if user is logged in) */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute>
                    <Contacts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <Tasks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notes"
                element={
                  <PrivateRoute>
                    <Notes />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
