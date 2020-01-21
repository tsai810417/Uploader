import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#17b9df',
    },
    secondary: {
      main: '#0982BA'
    }
  },
});

const Root = ({ store }) => (
  <Provider store={ store }>
    <HashRouter>
      <ThemeProvider theme={ theme }>
        <App />
      </ThemeProvider>
    </HashRouter>
  </Provider>
);

export default Root;
