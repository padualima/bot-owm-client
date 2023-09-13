import React, { useState }from 'react';
import { CssBaseline, Drawer, AppBar, Toolbar, List, Typography, ListItem, ListItemIcon, ListItemText, Container } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled, useTheme } from '@mui/system'; // Importe o useTheme
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import CustomSelect from '../components/forms/CustomSelect';


const Root = styled('div')({
  display: 'flex',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: '20px',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 0,
  },
}));

function Dashboard() {
  const theme = useTheme(); // Use o useTheme para obter o theme

  const isSmallScreen = theme.breakpoints.down('sm'); // Verifique se a tela é pequena

  const handleLogout = () => {
    window.location.href = 'http://localhost:3001';
  };

  const styles = {
    appBar: {
      display: 'flex',
      alignItems: 'space-between', // Centralizar verticalmente os itens na AppBar
      justifyContent: 'space-between', // Espaçamento entre itens, alinhando o logout à direita
    }
  };

  // handle modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  // handle date input mask
  const [maskedDate, setMaskedDate] = useState('');

  const handleMaskedDateChange = (event) => {
    setMaskedDate(event.target.value);
  };

  return (
    <Root>
      <CssBaseline />
      <AppBar position="fixed" style={{height: '63px'}}>
        <Toolbar style={styles.appBar}>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <Button className="logout-button" color="inherit" startIcon={<ExitToAppIcon />} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant={isSmallScreen ? 'temporary' : 'permanent'}>
        <Toolbar />
        <div style={{ overflow: 'auto' }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Mail" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Content style={{ marginTop: '64px' }}>
        <Container style={{ position: 'relative' }}>
          <div style={{ marginBottom: '20px' }}>
            <Typography variant="h4">Ultimas Publicações</Typography>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Data de Publicação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>30</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>25</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1 }}>
          <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
            <AddIcon />
          </Fab>
          </div>
        </Container>
      </Content>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', padding: 20 }}>
          <Typography variant="h6">Adicionar Publicação</Typography>
          <form>
            <TextField style={{ margin: '5px 0' }} label="Localidade" fullWidth />

            <InputMask mask="99/99/9999" value={maskedDate} onChange={handleMaskedDateChange} maskChar={null}>
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  style={{ margin: '5px 0' }}
                  label="Data de Publicação"
                  fullWidth
                  placeholder="dd/mm/aaaa"
                />
              )}
            </InputMask>

            <div>
              <CustomSelect
                options={
                  [
                    {
                      value: "",
                      label: "Nunca",
                    },
                    {
                      value: "a-cada-hora",
                      label: "A cada Hora",
                    },
                    {
                      value: "diariamente",
                      label: "Diariamente",
                    },
                    {
                      value: "dias-da-semana",
                      label: "Dias da Semana",
                    },
                    {
                      value: "fins-de-semana",
                      label: "Fins de Semana",
                    },
                    {
                      value: "semanalmente",
                      label: "Semanalmente",
                    },
                    {
                      value: "quinzenalmente",
                      label: "Quinzenalmente",
                    },
                    {
                      value: "mensalmente",
                      label: "Mensalmente",
                    },
                    {
                      value: "a-cada-3-meses",
                      label: "A Cada 3 Meses",
                    },
                    {
                      value: "a-cada-6-meses",
                      label: "A cada 6 Meses",
                    },
                    {
                      value: "anualmente",
                      label: "Anualmente",
                    },
                  ]
                }
                placeholder="Repetir"
              />
            </div>

            <Button style={{ margin: '5px 0' }} variant="contained" color="primary" fullWidth>
              Adicionar
            </Button>
          </form>
        </div>
      </Modal>

    </Root>
  );
}

export default Dashboard;
