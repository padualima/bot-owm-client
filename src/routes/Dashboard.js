import React, { useState, useEffect } from 'react';
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
import CustomSelect from '../components/forms/CustomSelect';
import Checkbox from '@mui/material/Checkbox';
import TimePicker from '../components/forms/TimePicker';
import DateInput from '../components/forms/DateInput';
import ApiCall from '../services/ApiCall';

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

  const isAuthenticated = !!localStorage.getItem('accessTokenStorage');

  const handleLogout = () => {
    if (isAuthenticated) {
      localStorage.removeItem('accessTokenStorage');

      window.location.href = 'http://localhost:3001';
    }
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

  // handle checkbox
  const [isScheduleChecked, setIsScheduleChecked] = useState(false);
  const [showScheduleCheckbox, setShowScheduleCheckbox] = useState(false);

  const handleScheduleCheckboxChange = (event) => {
    setIsScheduleChecked(event.target.checked);
    setShowScheduleCheckbox(event.target.checked); // Mostrar o Select quando o checkbox for marcado
  };

  // handle form
  const [formData, setFormData] = useState(
    {
      location_name: ''
    }
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    // console.log(`Field name: ${name}, Field value: ${value}`);

    setFormData({
      ...formData,
      [name]: value,
    });

    // console.log('Updated formData:', formData);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aqui você pode fazer a chamada à API e atualizar o estado com os resultados
    try {
      setIsModalOpen(false);

      const api_key = localStorage.getItem('accessTokenStorage')
      await ApiCall.postCreateTweet({ api_key, formData });

      const response = await ApiCall.getTweets({ api_key });
      setListTweets(response);

    } catch (error) {
      console.error('Erro ao chamar a API:', error);
    }
  };

  const [listTweets, setListTweets] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const api_key = localStorage.getItem('accessTokenStorage');
        const response = await ApiCall.getTweets({ api_key }); // Use await para aguardar a resposta
        // Atualize o estado listTweets com os dados da resposta
        if (response) {
          setListTweets(response);
        } else {
          console.error('Resposta da API não contém dados válidos:', response);
        } // Assumindo que a resposta contém um campo "data" com os dados dos tweets
      } catch (error) {
        console.error('Erro ao buscar tweets:', error);
      }
    };

    // Chame a função para buscar os dados
    fetchDataFromApi();
  }, []);


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
            <Typography variant="h4">Ultimos Tweets</Typography>
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
                {listTweets.map((tweet, index) => (
                  <TableRow key={index}>
                    <TableCell>{tweet.attributes.text}</TableCell>
                    <TableCell>{tweet.attributes.created}</TableCell>
                  </TableRow>
                ))}
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
          <Typography variant="h6">Nova Publicação</Typography>
          <form onSubmit={handleSubmit}>
          <TextField
            style={{ margin: '5px 0' }}
            label="Localidade"
            fullWidth
            name="location_name"
            value={formData.location_name} // Certifique-se de que esteja correto
            onChange={handleFormChange} // Certifique-se de que esteja correto
          />

            <div>
              <CustomSelect
                options={
                  [
                    {
                      value: "",
                      label: "Nunca",
                    },
                    {
                      value: "a-cada-30-minutos",
                      label: "A cada 30 minutos",
                    },
                    {
                      value: "a-cada-hora",
                      label: "A cada Hora",
                    },
                    {
                      value: "a-cada-2-horas",
                      label: "A cada 2 Horas",
                    },
                    {
                      value: "a-cada-3-horas",
                      label: "A cada 3 Horas",
                    },
                    {
                      value: "a-cada-5-horas",
                      label: "A cada 5 Horas",
                    },
                    {
                      value: "a-cada-10-horas",
                      label: "A cada 10 Horas",
                    },
                    {
                      value: "a-cada-12-horas",
                      label: "A cada 12 Horas",
                    }
                  ]
                }
                placeholder="Repetir"
              />
            </div>

            <label htmlFor="scheduleCheckbox">
              Agendar?
              <Checkbox
                id="scheduleCheckbox"
                checked={isScheduleChecked}
                onChange={handleScheduleCheckboxChange}
                color="primary"
              />
            </label>

            {showScheduleCheckbox && (
              <div style={{marginBottom: '5px'}}>
                <DateInput />
                <TimePicker />
              </div>
            )}

            <Button style={{ margin: '5px 0' }} variant="contained" color="primary" fullWidth type="submit">
              Salvar
            </Button>
          </form>
        </div>
      </Modal>
    </Root>
  );
}

export default Dashboard;
