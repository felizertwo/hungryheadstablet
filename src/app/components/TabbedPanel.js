import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
import styled from "styled-components";

const PanelWrapper = styled(Box)`
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const StyledTabs = styled(Tabs)`
  background: white;

  .MuiTabs-indicator {
    background-color: #c86a61;
  }

  .MuiTab-root {
    font-family: Arial, sans-serif;
    color: black;
    width: 100%;
    font-size: 30px;
    font-weight: 600;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.Mui-selected {
      color: black;
    }
  }

  .tab-label {
    margin-top: 5px;
  }

  .tab-icon {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`;

const TabbedPanel = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PanelWrapper>
      <StyledTabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <div>
                <img src={tab.image} alt={tab.label} className="tab-icon" />
                <div className="tab-label">{tab.label}</div>
              </div>
            }
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </PanelWrapper>
  );
};

TabbedPanel.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default TabbedPanel;
