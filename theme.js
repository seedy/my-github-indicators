import { createTheme, responsiveFontSizes } from '@mui/material';

// HELPERS
export const getTheme = () => responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#6786D3',
    },
    secondary: {
      main: '#FFCCB6',
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#8C8C8C',
    },
  },
}));

export default getTheme();
