export const dashboardColors = {
  ink: '#17223b',
  muted: '#64748b',
  border: '#dce4ef',
  canvas: '#f4f7fb',
  blue: '#3b82f6',
  cyan: '#22b8cf',
  coral: '#fb7185',
  violet: '#8b5cf6',
  amber: '#f59e0b',
  green: '#10b981',
};

export const panelSx = {
  border: `1px solid ${dashboardColors.border}`,
  borderRadius: 3,
  bgcolor: '#fff',
  boxShadow: '0 12px 30px rgba(30, 41, 59, 0.06)',
};

export const pageHeaderSx = {
  ...panelSx,
  p: { xs: 2.5, md: 3.5 },
  mb: 3,
};

export const dataGridSx = {
  border: 0,
  color: dashboardColors.ink,
  '& .MuiDataGrid-columnHeaders': {
    bgcolor: '#f8fafc',
    borderBottom: `1px solid ${dashboardColors.border}`,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 800,
  },
  '& .MuiDataGrid-row:hover': {
    bgcolor: '#f8fafc',
  },
  '& .MuiDataGrid-cell': {
    borderColor: '#edf1f6',
  },
};
