// src/components/common/LoadingSpinner.jsx
import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
