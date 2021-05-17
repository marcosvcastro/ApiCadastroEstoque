import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const muiTheme = createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary: {
        main: '#0c265f'
      },
      secondary: {
        main: '#d50000',
        light: '#33691e',
      },
      disabled: '#757575',
      red:'red',
      green:'green',
      white: 'FFF'
    }
  });

export default muiTheme;