import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from '../../services/articleService';

const blankForm = {
  name: '',
  title: '',
  image: '',
  content: '',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '92vw', sm: 760 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 2, sm: 3 },
};

const normalizeSlug = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const DashArticleListPage = () => {
  const [articles, setArticles] = useState(getArticles());
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const openModal = (article) => {
    setModal({ open: true, id: article?.name ?? null });
    setForm({
      name: article?.name ?? '',
      title: article?.title ?? '',
      image: article?.image ?? '',
      content: Array.isArray(article?.content) ? article.content.join('\n\n') : '',
    });
    setError('');
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
    setError('');
  };

  const refresh = () => {
    setArticles(getArticles());
  };

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return articles;
    }

    return articles.filter((article) =>
      [article.name, article.title, article.content?.[0] || '']
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [articles, searchTerm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = normalizeSlug(form.name || form.title);
    const title = String(form.title || '').trim();
    const image = String(form.image || '').trim();
    const content = String(form.content || '')
      .split(/\n{2,}/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!name || !title || !image || !content.length) {
      setError('Name/Title, image URL, and article content are required.');
      return;
    }

    if (!modal.id && articles.some((article) => article.name === name)) {
      setError('Article slug already exists. Use a different name.');
      return;
    }

    if (modal.id) {
      updateArticle(modal.id, { name, title, image, content });
      setMessage('Article updated successfully.');
    } else {
      createArticle({ name, title, image, content });
      setMessage('Article added successfully.');
    }

    refresh();
    closeModal();
  };

  const handleDelete = (name) => {
    deleteArticle(name);
    refresh();
    setMessage('Article deleted successfully.');
  };

  const columns = [
    { field: 'name', headerName: 'Slug', minWidth: 180, flex: 1 },
    { field: 'title', headerName: 'Title', minWidth: 240, flex: 1.2 },
    {
      field: 'preview',
      headerName: 'Preview',
      minWidth: 280,
      flex: 1.4,
      valueGetter: (value, row) => String(row.content?.[0] || '').slice(0, 90),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => handleDelete(row.name)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Dashboard Articles</Typography>
        <Button variant="contained" onClick={() => openModal()}>
          Add Article
        </Button>
      </Stack>

      {message ? (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMessage('')}>
          {message}
        </Alert>
      ) : null}

      <Paper sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Search articles"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ height: 520 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row.name}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          />
        </Box>
      </Paper>

      <Modal open={modal.open} onClose={closeModal}>
        <Box component="form" sx={modalStyle} onSubmit={handleSubmit}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {modal.id ? 'Edit Article' : 'Add Article'}
          </Typography>

          {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

          <Stack spacing={2}>
            <TextField
              label="Slug"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              helperText="Example: where-network-meets-web"
              fullWidth
            />
            <TextField
              label="Title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              fullWidth
            />
            <TextField
              label="Image URL"
              value={form.image}
              onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
              fullWidth
            />
            <TextField
              label="Content"
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              multiline
              rows={8}
              helperText="Use a blank line between paragraphs."
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashArticleListPage;
