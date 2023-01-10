import {defaultTheme} from 'react-admin';
import {ThemeOptions} from "@mui/material";

export const theme: ThemeOptions = {
  ...defaultTheme,
  typography: {
    ...defaultTheme.typography,
    fontFamily: 'Inter'
  },
  components: {
    ...defaultTheme.components,
  }
};