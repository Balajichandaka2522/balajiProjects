import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { bookService, authorService } from '../services/api';

function BookForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    stock: '',
    description: '',
    category: '',
    publishedDate: '',
    publisher: '',
  });

  useEffect(() => {
    loadAuthors();
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await authorService.getAllAuthors();
      setAuthors(response.data);
    } catch (error) {
      setError('Failed to load authors. Please try again.');
      console.error('Error loading authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBook = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await bookService.getBook(id);
      setBook(response.data);
    } catch (error) {
      setError('Failed to load book details. Please try again.');
      console.error('Error loading book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.author) {
      setError('Please select an author');
      return;
    }

    try {
      setLoading(true);
      setError('');
      if (id) {
        await bookService.updateBook(id, book);
      } else {
        await bookService.createBook(book);
      }
      navigate('/books');
    } catch (error) {
      setError('Failed to save book. Please try again.');
      console.error('Error saving book:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          {id ? 'Edit Book' : 'Add New Book'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={book.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="Author"
              name="author"
              value={book.author}
              onChange={handleChange}
              error={!book.author && error}
              helperText={!book.author && error ? 'Author is required' : ''}
            >
              <MenuItem value="" disabled>
                Select an author
              </MenuItem>
              {authors.map((author) => (
                <MenuItem key={author._id} value={author._id}>
                  {author.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="ISBN"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={book.price}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Stock"
              name="stock"
              value={book.stock}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Category"
              name="category"
              value={book.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Published Date"
              name="publishedDate"
              value={book.publishedDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Publisher"
              name="publisher"
              value={book.publisher}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={book.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : id ? 'Update' : 'Create'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/books')}
                disabled={loading}
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

export default BookForm; 