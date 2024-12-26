import React, { useContext, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";

import UpdateContact from "./components/Contacts/UpdateContact";
import ContactItem from "./components/Contacts/ContactItem";
import UpdateTaskPage from "./components/Tasks/UpdateTaskPage";
import CreateTaskForm from "./components/Tasks/CreateTaskForm";
import UserList from "./components/Users/UserList";

import Sidebar from "./components/Sidebar/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ userName }) => (
  <header className="bg-white shadow-md p-6 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <h1 className="text-3xl font-extrabold text-gray-900">Welcome to Your CRM</h1>
      <div className="flex items-center space-x-4">
        <span className="text-lg text-gray-700 font-semibold">{`Hello, ${userName}`}</span>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .417-.163.817-.445 1.112L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
);

const privateRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/contact/:id", element: <ContactItem /> },
  { path: "/update-contact/:id", element: <UpdateContact /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/update-task/:id", element: <UpdateTaskPage /> },
  { path: "/create-task", element: <CreateTaskForm /> },
  { path: "/users", element: <UserList /> },
  { path: "/notes", element: <Notes /> },
];

const AppContent = () => {
  const { user } = useContext(AuthContext);

  const userName = useMemo(() => {
    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    return parsedData?.user?.name || "Guest";
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-gray-100 text-gray-800">
        {user && <Sidebar />}
        <div className={`flex-1 ${user ? "ml-64" : ""} overflow-y-auto`}>
          <Header userName={userName} />
          <main className="py-8 px-6">
            <Routes>
              <Route
                path="/login"
                element={user ? <Navigate to="/dashboard" /> : <Login />}
              />
              <Route
                path="/register"
                element={user ? <Navigate to="/dashboard" /> : <Register />}
              />
              {privateRoutes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={<PrivateRoute>{element}</PrivateRoute>}
                />
              ))}
              <Route
                path="/"
                element={user ? <Navigate to="/dashboard" /> : <Login />}
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
    <Provider store={store}>
      <AppContent />
    </Provider>
  </AuthProvider>
);

export default App;
