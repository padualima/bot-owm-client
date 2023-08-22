import React from "react";
import { Paper, Container, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import LoginTwitterButton from '../components/auth/LoginTwitterButton';

const theme = createTheme();

const Home = () => {
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: '400px' }}>
          <Typography variant="h4" align="center" gutterBottom>
          Login OWM Bot
          </Typography>
          <form>
            <LoginTwitterButton />
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
