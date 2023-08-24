import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardHolder from './cardHolder/cardHolder';

export default function LabTabs() {
  const [value, setValue] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All To do" value="" />
            <Tab label="TODO" value="TODO" />
            <Tab label="DOING" value="DOING" />
            <Tab label="DONE" value="DONE" />
          </TabList>
        </Box>
        <TabPanel value=""><CardHolder selectedTab="ALL"/></TabPanel>
        <TabPanel value="TODO"><CardHolder selectedTab="TODO"/></TabPanel>
        <TabPanel value="DOING"><CardHolder selectedTab="DOING"/></TabPanel>
        <TabPanel value="DONE"><CardHolder selectedTab="DONE"/></TabPanel>
      </TabContext>
    </Box>
  );
}