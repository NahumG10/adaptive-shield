import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({
  options,
  selectedItem,
  setSelectedItem,
  label,
}) {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedItem}
        label={label}
        onChange={(e) => {
          setSelectedItem(e.target.value);
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((elem) => {
          return (
            <MenuItem key={elem.id} value={elem.id}>
              {elem.id} - {elem.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
