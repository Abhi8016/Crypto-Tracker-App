import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export default function TabsComponents() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    color: "var (--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div>
          <TabList
            onChange={handleChange}
            variant="fullWidth"
            // indicatorColor="primary"
            // textColor="inherit"
          >
            <Tab label="Grid" value="grid" sx={style} />
            <Tab label="List" value="list" sx={style} />
          </TabList>
        </div>
        <TabPanel value="grid">grid</TabPanel>
        <TabPanel value="list">list</TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
