import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  getAllBooks: () => api.get('/books'),
  getBook: (id) => api.get(`/books/${id}`),
  createBook: (book) => api.post('/books', book),
  updateBook: (id, book) => api.put(`/books/${id}`, book),
  deleteBook: (id) => api.delete(`/books/${id}`),
};

export const authorService = {
  getAllAuthors: () => api.get('/authors'),
  getAuthor: (id) => api.get(`/authors/${id}`),
  createAuthor: (author) => api.post('/authors', author),
  updateAuthor: (id, author) => api.put(`/authors/${id}`, author),
  deleteAuthor: (id) => api.delete(`/authors/${id}`),
}; 