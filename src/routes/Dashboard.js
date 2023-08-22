import React from "react";
import { Paper, Container, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';

const theme = createTheme();

const Dashboard = () => {
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: '400px' }}>
          <Typography variant="h4" align="center" gutterBottom>
          Aqui vai ser meu dashboard
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;
