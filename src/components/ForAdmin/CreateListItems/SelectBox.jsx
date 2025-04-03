import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectBox = ({ label, options, value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        size="small"
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}>
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
