import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Book, Person } from '@mui/icons-material';

function Navbar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Book Store Management
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/books"
            startIcon={<Book />}
          >
            Books
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/authors"
            startIcon={<Person />}
          >
            Authors
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 