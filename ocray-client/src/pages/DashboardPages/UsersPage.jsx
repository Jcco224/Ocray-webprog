import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';
import { canAccessUsersPage } from '../../utils/adminAuth';
import {
  dashboardColors,
  dataGridSx,
  pageHeaderSx,
  panelSx,
} from './dashboardStyles';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '92vw', sm: 820 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 2, sm: 3 },
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const splitName = (name) => {
  const parts = String(name ?? '').trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  };
};

const normalizeRole = (role) => {
  const nextRole = String(role ?? '').trim().toLowerCase();
  return roles.includes(nextRole) ? nextRole : 'editor';
};

const normalizeStatus = (status, isActive) => {
  if (typeof isActive === 'boolean') {
    return isActive;
  }

  return String(status ?? '').trim().toLowerCase() !== 'inactive';
};

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => {
        const seededName = splitName(user.name);
        const firstName = String(user.firstName ?? seededName.firstName).trim();
        const lastName = String(user.lastName ?? seededName.lastName).trim();
        const email = String(user.email ?? '').trim().toLowerCase();

        return {
          id: Number(user.id) || index + 1,
          firstName,
          lastName,
          age: String(user.age ?? '').trim(),
          gender: genders.includes(
            String(user.gender ?? '').trim().toLowerCase()
          )
            ? String(user.gender ?? '').trim().toLowerCase()
            : '',
          contactNumber: String(user.contactNumber ?? '').trim(),
          email,
          role: normalizeRole(user.role),
          username: String(
            user.username ?? email.split('@')[0] ?? ''
          ).trim().toLowerCase(),
          password: String(user.password ?? ''),
          address: String(user.address ?? user.department ?? '').trim(),
          isActive: normalizeStatus(user.status, user.isActive),
        };
      }),
      error: '',
    };
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/data/users.json.',
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmation, setConfirmation] = useState('');
  const [loadError] = useState(seed.error);

  useEffect(() => {
    if (!canAccessUsersPage()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
    setShowPassword(false);
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const age = form.age.trim();
    const contactNumber = form.contactNumber.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!modal.id && !password) {
      nextErrors.password = 'Password is required.';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must contain numbers only.';
    }

    if (contactNumber && !/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    if (username && /\s/.test(username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (
      email &&
      users.some((user) => user.id !== modal.id && user.email === email)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    if (
      username &&
      users.some((user) => user.id !== modal.id && user.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    if (password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    if (modal.id) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === modal.id
            ? { ...user, ...nextUser, password: nextUser.password || user.password }
            : user
        )
      );
      setConfirmation('User updated successfully.');
    } else {
      setUsers((currentUsers) => [
        ...currentUsers,
        { ...nextUser, id: Date.now() },
      ]);
      setConfirmation('New user saved successfully.');
    }

    closeModal();
  };

  const toggleStatus = async (id) => {
    const selectedUser = users.find((user) => user.id === id);
    if (!selectedUser) {
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
    setConfirmation(
      `${selectedUser.firstName} ${selectedUser.lastName} is now ${
        selectedUser.isActive ? 'inactive' : 'active'
      }.`
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const filteredUsers = users.filter((user) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !query ||
      [user.firstName, user.lastName, user.email, user.username].some((field) =>
        String(field).toLowerCase().includes(query)
      );
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesGender =
      genderFilter === 'all' || user.gender === genderFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' ? user.isActive : !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (value, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 168 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 228 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 180,
      valueGetter: (value, row) => labelize(row.role),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(row.id)}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          ...pageHeaderSx,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: dashboardColors.blue, fontWeight: 800, letterSpacing: 2 }}>
            Account Directory
          </Typography>
          <Typography variant="h4" sx={{ color: dashboardColors.ink, fontWeight: 900 }}>
            Users
          </Typography>
          <Typography sx={{ mt: 1, color: dashboardColors.muted }}>
            Search, filter, and manage account access.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' }, bgcolor: dashboardColors.ink }}
        >
          Add User
        </Button>
      </Box>

      {loadError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loadError}
        </Alert>
      ) : null}

      {confirmation ? (
        <Alert
          severity="success"
          onClose={() => setConfirmation('')}
          sx={{ mb: 2 }}
        >
          {confirmation}
        </Alert>
      ) : null}

      <Paper sx={{ ...panelSx, p: { xs: 1.5, sm: 2.5 }, minWidth: 0, overflow: 'hidden' }}>
        {users.length ? (
          <>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <TextField
                label="Search users"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search name, email, or username"
                fullWidth
              />
              <TextField
                label="Role"
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                select
                sx={{ minWidth: { xs: '100%', md: 150 } }}
              >
                <MenuItem value="all">All roles</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Gender"
                value={genderFilter}
                onChange={(event) => setGenderFilter(event.target.value)}
                select
                sx={{ minWidth: { xs: '100%', md: 150 } }}
              >
                <MenuItem value="all">All genders</MenuItem>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                select
                sx={{ minWidth: { xs: '100%', md: 150 } }}
              >
                <MenuItem value="all">All statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Stack>

            {filteredUsers.length ? (
              <Box
                sx={{
                  height: { xs: 460, sm: 520 },
                  width: '100%',
                  minWidth: 0,
                }}
              >
                <DataGrid
                  rows={filteredUsers}
                  columns={columns}
                  getRowId={(row) => row.id}
                  disableRowSelectionOnClick
                  pageSizeOptions={[5, 10]}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5, page: 0 } },
                  }}
                  sx={{
                    ...dataGridSx,
                    minWidth: 0,
                    '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                      outline: 'none',
                    },
                  }}
                />
              </Box>
            ) : (
              <Alert severity="info">
                No users match the current search and filters.
              </Alert>
            )}
          </>
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Paper>

      <Modal
        open={modal.open}
        onClose={closeModal}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
      >
        <Box component="form" sx={modalStyle} onSubmit={handleSubmit}>
          <Typography id="add-user-modal-title" variant="h5" sx={{ mb: 2 }}>
            {modal.id ? 'Edit User' : 'Add User'}
          </Typography>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('firstName', 'First Name')} />
              <TextField {...fieldProps('lastName', 'Last Name')} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('age', 'Age')} />
              <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('contactNumber', 'Contact Number')} />
              <TextField
                {...fieldProps('email', 'Email Address', { type: 'email' })}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('role', 'Role', { select: true })}>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField {...fieldProps('username', 'Username')} />
            </Stack>
            <TextField
              {...fieldProps('password', 'Password', {
                type: showPassword ? 'text' : 'password',
                slotProps: {
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(event) => event.preventDefault()}
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                },
              })}
            />
            <TextField
              {...fieldProps('address', 'Address', {
                multiline: true,
                rows: 3,
              })}
            />
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />
              }
              label={
                form.isActive ? 'User status: Active' : 'User status: Inactive'
              }
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersPage;
