import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectBox = ({ label, options, value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
