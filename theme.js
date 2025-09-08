// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "transparent", // main page Box background shows gradient
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,          // remove shadow
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,          // remove shadow by default
      },
    },
  },
});

export default theme;
