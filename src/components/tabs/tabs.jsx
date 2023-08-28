import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardHolder from "../cardHolder/cardHolder";
import "./tabs.css";

export default function LabTabs() {
  const [value, setValue] = useState("");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function logout() {
    setShowLogoutConfirmation(true);
  }

  function handleLogoutConfirmed() {
    localStorage.removeItem("authToken");
    window.location.reload();
  }

  function handleLogoutCancelled() {
    setShowLogoutConfirmation(false);
    setValue("");
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {showLogoutConfirmation ? (
        <div className="modal-container">
          <div className="modal-content">
            <p className="modal-title">Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button
                onClick={handleLogoutConfirmed}
                className="modal-button modal-button-yes"
              >
                Yes
              </button>
              <button
                onClick={handleLogoutCancelled}
                className="modal-button modal-button-no"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All To do" value="" />
              <Tab label="TODO" value="TODO" />
              <Tab label="DOING" value="DOING" />
              <Tab label="DONE" value="DONE" />
              <Tab label="Log out" value="5" onClick={logout} />
            </TabList>
          </Box>
          <TabPanel value="">
            <CardHolder selectedTab="ALL" />
          </TabPanel>
          <TabPanel value="TODO">
            <CardHolder selectedTab="TODO" />
          </TabPanel>
          <TabPanel value="DOING">
            <CardHolder selectedTab="DOING" />
          </TabPanel>
          <TabPanel value="DONE">
            <CardHolder selectedTab="DONE" />
          </TabPanel>
        </TabContext>
      )}
    </Box>
  );
}
