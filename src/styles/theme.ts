import { createTheme } from '@mui/material/styles';

// Custom theme with a purple/teal palette instead of the default blue
export const theme = createTheme({
  palette: {
    primary: {
      main: '#6B46C1', // Purple
      light: '#9F7AEA',
      dark: '#553C9A',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0D9488', // Teal
      light: '#14B8A6',
      dark: '#0F766E',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
});
