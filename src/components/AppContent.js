// AppContent.js
import React from "react";
import FormComponent from "./form/form";
import LabTabs from "./tabs/tabs";
import "./../App.css";
import { useEffect } from "react";

function AppContent() {
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="App">
      <FormComponent />
      <div className="app-page">
        <LabTabs />
      </div>
    </div>
  );
}

export default AppContent;
