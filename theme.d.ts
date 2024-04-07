import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom?: {
      header?: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      header?: string;
    };
  }
}
