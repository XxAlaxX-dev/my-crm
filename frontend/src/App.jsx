import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar/Sidebar";

import UpdateContact from "./components/Contacts/UpdateContact";
import { Provider } from "react-redux";
import store from "./redux/store";
import ContactItem from "./components/Contacts/ContactItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateTaskPage from "./components/Tasks/UpdateTaskPage";
import CreateTaskForm from "./components/Tasks/CreateTaskForm";


const AppContent = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex h-screen bg-gradient-to-r from-gray-50 to-gray-200 text-gray-800">
        {user && <Sidebar logout={logout} />}
        <div className={`flex-1 ${user ? "ml-64" : ""} overflow-y-auto`}>
          <header className="bg-white shadow-md p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-3xl font-extrabold text-gray-900">
                {user ? "Welcome to Your CRM" : "CRM Application"}
              </h1>
              {user && (
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </header>
          <main className="py-8 px-6">
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
              <Route path="/contact/:id" element={<ContactItem/>} />

              <Route path="/update-contact/:id" element={<PrivateRoute><UpdateContact /></PrivateRoute>} />
              <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
              <Route path="/update-task/:id"  element={<PrivateRoute><UpdateTaskPage/></PrivateRoute>} />
              <Route path="/create-task"  element={<PrivateRoute><CreateTaskForm/></PrivateRoute>} />

        
              
              <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />

              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </AuthProvider>
);

export default App;
