import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Index from './components/Index';
import muiTheme from './config/Theme';

function App(props) {

  useEffect(() => {
    props.history.push('/index');

  }, []);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Index />
    </MuiThemeProvider>
  );
}

export default withRouter(App);
