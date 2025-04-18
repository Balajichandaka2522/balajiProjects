import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { authorService } from '../services/api';

function AuthorForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState({
    name: '',
    biography: '',
    nationality: '',
    birthDate: '',
    website: '',
  });

  useEffect(() => {
    if (id) {
      loadAuthor();
    }
  }, [id]);

  const loadAuthor = async () => {
    try {
      const response = await authorService.getAuthor(id);
      setAuthor(response.data);
    } catch (error) {
      console.error('Error loading author:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await authorService.updateAuthor(id, author);
      } else {
        await authorService.createAuthor(author);
      }
      navigate('/authors');
    } catch (error) {
      console.error('Error saving author:', error);
    }
  };

  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          {id ? 'Edit Author' : 'Add New Author'}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={author.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nationality"
              name="nationality"
              value={author.nationality}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Birth Date"
              name="birthDate"
              value={author.birthDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Website"
              name="website"
              value={author.website}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Biography"
              name="biography"
              value={author.biography}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {id ? 'Update' : 'Create'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/authors')}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AuthorForm; 