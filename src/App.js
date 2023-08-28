import React from "react";
import "./App.css";
import AppContent from "./components/AppContent";
import Login from "./components/login/login";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const authToken = localStorage.getItem("authToken");
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<AppContent />} />
          <Route
            path="/"
            element={authToken ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
