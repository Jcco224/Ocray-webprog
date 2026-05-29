import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { userRows } from './dashboardData';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 220,
  },
  {
    field: 'role',
    headerName: 'Role',
    minWidth: 120,
  },
  {
    field: 'team',
    headerName: 'Team',
    minWidth: 140,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={params.value === 'Active' ? 'success' : params.value === 'Pending' ? 'warning' : 'default'}
        variant="outlined"
      />
    ),
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    minWidth: 170,
  },
];

const summaryCards = [
  {
    label: 'Total Users',
    value: userRows.length,
    icon: <GroupOutlinedIcon />,
    color: '#2563eb',
  },
  {
    label: 'Admin Accounts',
    value: userRows.filter((row) => row.role === 'Admin').length,
    icon: <ShieldOutlinedIcon />,
    color: '#7c3aed',
  },
  {
    label: 'Pending Review',
    value: userRows.filter((row) => row.status === 'Pending').length,
    icon: <PendingActionsOutlinedIcon />,
    color: '#ea580c',
  },
];

const cardSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
};

function UsersPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          p: { xs: 3, md: 4 },
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Users
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800 }}>
          User List and Access Details
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
          Review account ownership, team assignments, access roles, and activity from one table.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 2,
        }}
      >
        {summaryCards.map(({ label, value, icon, color }) => (
          <Card key={label} sx={cardSx}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
                    {value}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card sx={cardSx}>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                User Directory
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Filter, scan, and review user details for administrative tasks.
              </Typography>
            </Box>
            <Chip label={`${userRows.length} users`} variant="outlined" />
          </Stack>

          <Box sx={{ height: 480, width: '100%' }}>
            <DataGrid
              rows={userRows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
