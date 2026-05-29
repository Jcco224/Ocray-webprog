import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { reportCategoryMix, trafficTrend } from './dashboardData';

const cardSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
};

function ReportsPage() {
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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="overline" color="text.secondary">
              Reports
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800 }}>
              Charts and Data Visualizations
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 700 }}>
              This page focuses on trends, category mix, and report output so the
              admin can quickly spot changes in traffic, activity, and reporting volume.
            </Typography>
          </Box>
          <Chip label="Analytics view" color="primary" sx={{ alignSelf: 'flex-start' }} />
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', xl: '1.2fr 0.8fr' },
          gap: 2,
        }}
      >
        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Monthly Views and Signups
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A line chart showing top-level growth across the last six months.
            </Typography>
            <Box sx={{ mt: 2, width: '100%', overflowX: 'auto' }}>
              <LineChart
                height={320}
                dataset={trafficTrend}
                xAxis={[{ dataKey: 'month', scaleType: 'point' }]}
                series={[
                  { dataKey: 'views', label: 'Views' },
                  { dataKey: 'signups', label: 'Signups' },
                ]}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Report Mix
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Distribution of what the admin team monitors most often.
            </Typography>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <PieChart
                width={300}
                height={260}
                series={[{ data: reportCategoryMix, innerRadius: 45 }]}
              />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Card sx={cardSx}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Reporting Throughput
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total completed reports by month. This helps compare momentum against traffic growth.
          </Typography>
          <Box sx={{ mt: 2, width: '100%', overflowX: 'auto' }}>
            <BarChart
              height={320}
              dataset={trafficTrend}
              xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
              series={[{ dataKey: 'reports', label: 'Reports Completed' }]}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReportsPage;
