import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import {
  dashboardColors,
  dataGridSx,
  pageHeaderSx,
  panelSx,
} from './dashboardStyles';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const summaryStats = [
  { label: 'Generated', value: '89' },
  { label: 'Completed', value: '71' },
  { label: 'On-Time Rate', value: '78%' },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900');

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page {
              size: A4;
              margin: 16mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }

            .report-shell {
              padding: 22px;
              border: 2px solid #cbd5e1;
              border-radius: 12px;
            }

            .report-header {
              margin-bottom: 24px;
              padding: 14px;
              border: 1px solid #d1d5db;
              border-radius: 10px;
              background: #f8fafc;
            }

            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }

            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
            }

            .report-stats {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 12px;
              margin: 18px 0 24px;
            }

            .report-stat {
              padding: 14px;
              border: 1px solid #d1d5db;
              border-radius: 10px;
              background: #ffffff;
            }

            .report-stat strong {
              display: block;
              font-size: 22px;
              margin-bottom: 4px;
            }

            .report-stat span {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.12em;
              color: #6b7280;
            }

            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
              page-break-inside: avoid;
              border-radius: 10px;
            }

            .report-content .MuiCardContent-root {
              padding: 20px;
            }

            .report-content svg {
              max-width: 100%;
            }

            .report-footer {
              margin-top: 16px;
              padding-top: 10px;
              border-top: 1px dashed #cbd5e1;
              font-size: 12px;
              color: #6b7280;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-stats">
              <article class="report-stat">
                <strong>89</strong>
                <span>Generated</span>
              </article>
              <article class="report-stat">
                <strong>71</strong>
                <span>Completed</span>
              </article>
              <article class="report-stat">
                <strong>78%</strong>
                <span>On-Time Rate</span>
              </article>
            </section>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
            <p class="report-footer">
              Laboratory 5 Report Export - Generated by ReportsPage
            </p>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={pageHeaderSx}
      >
        <Box>
          <Typography variant="overline" sx={{ color: dashboardColors.blue, fontWeight: 800, letterSpacing: 2 }}>
            Reporting Center
          </Typography>
          <Typography variant="h4" sx={{ color: dashboardColors.ink, fontWeight: 900 }}>
            Reports
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: dashboardColors.muted }}>
            Report analytics overview showing generated reports, category
            breakdown, and current completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained" sx={{ bgcolor: dashboardColors.ink }}>Generate</Button>
          <Button variant="outlined" onClick={handlePrint}>
            Export
          </Button>
          <Button variant="outlined">Filter</Button>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        {summaryStats.map((stat) => (
          <Card key={stat.label} sx={{ ...panelSx, minWidth: 180, flex: 1 }}>
            <CardContent>
              <Typography variant="overline" sx={{ color: dashboardColors.muted, fontWeight: 800 }}>
                {stat.label}
              </Typography>
              <Typography variant="h4" sx={{ color: dashboardColors.ink, fontWeight: 900 }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Card sx={panelSx}>
          <CardContent>
            <Typography variant="h6" sx={{ color: dashboardColors.ink, fontWeight: 800 }}>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: dashboardColors.muted }}>
              Generated and completed reports across the latest reporting months.
            </Typography>
            <BarChart
              height={300}
              xAxis={[
                {
                  data: ['January', 'February', 'March', 'April'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [18, 24, 20, 27],
                  label: 'Generated',
                  color: dashboardColors.blue,
                },
                {
                  data: [12, 19, 17, 23],
                  label: 'Completed',
                  color: dashboardColors.cyan,
                },
              ]}
            />
          </CardContent>
        </Card>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 3,
          }}
        >
          <Card sx={panelSx}>
            <CardContent>
              <Typography variant="h6" sx={{ color: dashboardColors.ink, fontWeight: 800 }}>
                Report Category Share
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: dashboardColors.muted }}>
                Distribution of report requests by category.
              </Typography>
              <PieChart
                height={260}
                series={[
                  {
                    innerRadius: 55,
                    outerRadius: 95,
                    paddingAngle: 4,
                    data: [
                      { id: 0, value: 14, label: 'Sales', color: dashboardColors.blue },
                      { id: 1, value: 10, label: 'Users', color: dashboardColors.cyan },
                      { id: 2, value: 8, label: 'Inventory', color: dashboardColors.amber },
                      { id: 3, value: 6, label: 'Finance', color: dashboardColors.violet },
                    ],
                  },
                ]}
              />
            </CardContent>
          </Card>

          <Card sx={panelSx}>
            <CardContent>
              <Typography variant="h6" sx={{ color: dashboardColors.ink, fontWeight: 800 }}>
                Completion Rate
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: dashboardColors.muted }}>
                Reports completed on time during the latest cycle.
              </Typography>
              <Box sx={{ display: 'flex', minHeight: 260, alignItems: 'center', justifyContent: 'center' }}>
                <Gauge
                  width={220}
                  height={220}
                  value={78}
                  startAngle={-110}
                  endAngle={110}
                  sx={{
                    '& .MuiGauge-valueArc': { fill: dashboardColors.green },
                    '& .MuiGauge-referenceArc': { fill: '#e8edf4' },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Card sx={panelSx}>
          <CardContent>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={dataGridSx}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
