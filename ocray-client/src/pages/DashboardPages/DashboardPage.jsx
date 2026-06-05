import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {
  dashboardColors,
  pageHeaderSx,
  panelSx,
} from './dashboardStyles';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const summaryCards = [
  {
    label: 'Total Users',
    value: '1,215',
    change: '+12.4%',
    icon: <PeopleAltIcon />,
    color: dashboardColors.cyan,
    spark: [12, 18, 15, 24, 20, 28, 25],
  },
  {
    label: 'Page Views',
    value: '42.2k',
    change: '+8.1%',
    icon: <VisibilityIcon />,
    color: dashboardColors.blue,
    spark: [18, 17, 22, 20, 28, 25, 32],
  },
  {
    label: 'Articles',
    value: '311',
    change: '+5.7%',
    icon: <ArticleIcon />,
    color: dashboardColors.coral,
    spark: [25, 21, 23, 18, 22, 16, 19],
  },
  {
    label: 'Growth',
    value: '22%',
    change: '+3.2%',
    icon: <TrendingUpIcon />,
    color: dashboardColors.violet,
    spark: [11, 14, 12, 19, 16, 24, 21],
  },
];

const PanelTitle = ({ title, subtitle }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ color: dashboardColors.ink, fontWeight: 800 }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: dashboardColors.muted }}>
      {subtitle}
    </Typography>
  </Box>
);

function DashboardPage() {
  return (
    <Box>
      <Box sx={pageHeaderSx}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: dashboardColors.blue, fontWeight: 800, letterSpacing: 2 }}
            >
              Analytics Overview
            </Typography>
            <Typography variant="h4" sx={{ color: dashboardColors.ink, fontWeight: 900 }}>
              Dashboard Performance
            </Typography>
            <Typography sx={{ mt: 1, color: dashboardColors.muted }}>
              A clear view of audience, content, and engagement performance.
            </Typography>
          </Box>
          <Chip label="Updated today" sx={{ alignSelf: 'flex-start', bgcolor: '#e8f1ff', color: dashboardColors.blue, fontWeight: 800 }} />
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 2,
        }}
      >
        {summaryCards.map((card) => (
          <Card key={card.label} sx={{ ...panelSx, borderTop: `4px solid ${card.color}` }}>
            <CardContent sx={{ pb: '16px !important' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="body2" sx={{ color: dashboardColors.muted, fontWeight: 700 }}>
                    {card.label}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 0.5, color: dashboardColors.ink, fontWeight: 900 }}>
                    {card.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: dashboardColors.green, fontWeight: 800 }}>
                    {card.change} this month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: card.color, width: 40, height: 40 }}>{card.icon}</Avatar>
              </Stack>
              <LineChart
                height={70}
                margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                series={[{ data: card.spark, color: card.color, showMark: false }]}
                xAxis={[{ data: card.spark.map((_, index) => index), hideTooltip: true }]}
                leftAxis={null}
                bottomAxis={null}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '0.8fr 1.4fr' }, gap: 2, mb: 2 }}>
        <Card sx={panelSx}>
          <CardContent>
            <PanelTitle title="Audience Status" subtitle="Current account distribution" />
            <PieChart
              height={290}
              series={[{
                innerRadius: 72,
                outerRadius: 110,
                paddingAngle: 4,
                data: [
                  { id: 0, value: 58, label: 'Active', color: dashboardColors.cyan },
                  { id: 1, value: 24, label: 'Pending', color: dashboardColors.amber },
                  { id: 2, value: 18, label: 'Review', color: dashboardColors.violet },
                ],
              }]}
            />
          </CardContent>
        </Card>

        <Card sx={panelSx}>
          <CardContent>
            <PanelTitle title="Traffic Trends" subtitle="Views, visitors, and article reads" />
            <LineChart
              height={290}
              xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'point' }]}
              series={[
                { data: [32, 44, 38, 56, 49, 64], label: 'Views', color: dashboardColors.blue, showMark: false },
                { data: [20, 31, 28, 42, 38, 51], label: 'Visitors', color: dashboardColors.green, showMark: false },
                { data: [14, 22, 19, 27, 31, 36], label: 'Reads', color: dashboardColors.amber, showMark: false },
              ]}
            />
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 2 }}>
        <Card sx={panelSx}>
          <CardContent>
            <PanelTitle title="Content Output" subtitle="Published content by category" />
            <BarChart
              height={300}
              xAxis={[{ data: ['Web', 'Network', 'Security', 'Cloud', 'Other'], scaleType: 'band' }]}
              series={[
                { data: [26, 34, 22, 29, 18], label: 'Published', color: dashboardColors.blue },
                { data: [12, 18, 14, 16, 9], label: 'Drafts', color: dashboardColors.cyan },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={panelSx}>
          <CardContent>
            <PanelTitle title="Engagement by Month" subtitle="Visits compared with conversions" />
            <BarChart
              height={300}
              xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'band' }]}
              series={[
                { data: [38, 44, 48, 53, 57, 65], label: 'Visits', color: dashboardColors.violet },
                { data: [18, 24, 26, 31, 34, 39], label: 'Conversions', color: dashboardColors.coral },
              ]}
            />
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ ...panelSx, mt: 2 }}>
        <CardContent>
          <PanelTitle
            title="Location Map"
            subtitle="National University-Manila, Sampaloc"
          />
          <Box
            sx={{
              height: 380,
              width: '100%',
              overflow: 'hidden',
              border: `1px solid ${dashboardColors.border}`,
              borderRadius: 2,
            }}
          >
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  National University-Manila <br />
                  551 F Jhocson St, Sampaloc, Manila
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
