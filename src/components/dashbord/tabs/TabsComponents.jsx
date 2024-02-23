import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import Grid from "../grid/Grid";
import "./styles.css";
import List from "../list/List";
import { motion } from "framer-motion";

export default function TabsComponents({ coins }) {
  const [value, setValue] = useState("grid");
  const [fav, setFav] = useState(false);
  // console.log(fav);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    color: "var(--white)",
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
        <TabList
          onChange={handleChange}
          variant="fullWidth"
          // indicatorColor="primary"
          // textColor="inherit"
        >
          <Tab label="Grid" value="grid" sx={style} />
          <Tab label="List" value="list" sx={style} />
        </TabList>

        <TabPanel value="grid">
          <div className="grid-flex">
            {coins.map((coin, i) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 0.6,
                    duration: 0.7,
                    delay: i / 16,
                  }}
                  key={i}
                >
                  <Grid coin={coin} />
                </motion.div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value="list">
          <table className="list-table">
            {coins.map((item, i) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: 70 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 0.6,
                    duration: 0.7,
                    delay: i / 16,
                  }}
                  key={i}
                >
                  <List coin={item} />
                </motion.div>
              );
            })}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
