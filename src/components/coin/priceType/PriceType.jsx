import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import "./styles.css";
export default function PriceType({ priceType, handlePriceTypeChange }) {
  return (
    <div className="toogle-prices">
      <ToggleButtonGroup
        value={priceType}
        exclusive
        onChange={(e) => {
          handlePriceTypeChange(e);
        }}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "var(--black) !important",
            color: "var(--blue) !important",
          },
          borderColor: "var(--blue)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid !important",
            borderColor: "unset",
            color: "var(--blue)",
          },
          "& .MuiToggleButton-standard": {
            color: "var(--blue)",
          },
        }}
      >
        <ToggleButton value="prices" className="toggle-btn">
          Prices
        </ToggleButton>
        <ToggleButton value="market_caps" className="toggle-btn">
          Market Cap
        </ToggleButton>
        <ToggleButton value="total_volumes" className="toggle-btn">
          Total volume
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
