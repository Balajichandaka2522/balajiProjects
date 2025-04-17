import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { Book, Person } from '@mui/icons-material';

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Book Store Management
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Manage your books and authors with ease
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <Book sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Books
            </Typography>
            <Typography color="text.secondary" paragraph>
              Manage your book collection, add new books, and update existing ones.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Book />}
              onClick={() => navigate('/books')}
            >
              Manage Books
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <Person sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Authors
            </Typography>
            <Typography color="text.secondary" paragraph>
              Manage author information, add new authors, and update their details.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Person />}
              onClick={() => navigate('/authors')}
            >
              Manage Authors
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home; 