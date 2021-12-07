import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from './Components/login/auth'
import Navbar from "./Components/navbar/navbar";
import AppRouter from "./router";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  const { authData } = useSelector((state) => state.authReducer);
 console.log("authData ============", authData);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          {/* {authData && authData === 'true' ?
            <Navbar />
          :
            <Redirect to={'/login'} component={Login}/>
          } */}
          <AppRouter />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;