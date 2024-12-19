import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar/Sidebar"; // Sidebar component
import AddTask from "./components/Tasks/AddTask";
import UpdateTask from "./components/Tasks/UpdateTask";
const AppContent = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 text-gray-800">
        {/* Sidebar for logged-in users */}
        {user && <Sidebar logout={logout} />}
        <div className={`flex-1 ${user ? "ml-64" : ""} overflow-y-auto`}>
          <header className="bg-white shadow-md p-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900">
                {user ? "Welcome to Your CRM" : "CRM Application"}
              </h1>
            </div>
          </header>
          <main className="py-6 px-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
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
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/tasks/update/:id" element={<UpdateTask />} />
              <Route
                path="/notes"
                element={
                  <PrivateRoute>
                    <Notes />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
