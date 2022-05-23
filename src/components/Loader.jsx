import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export default function Loader() {
  return (
    <Box sx={{ width: "100%" }} style={{ textAlign: "center", marginTop: 10 }}>
      <Typography variant="h3" component="div" color={"#fff"} gutterBottom>
        Loading
      </Typography>
      <LinearProgress />
    </Box>
  );
}
