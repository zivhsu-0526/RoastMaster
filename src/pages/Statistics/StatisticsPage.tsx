import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  TrendingUp as TrendingUpIcon,
  LocalCafe as LocalCafeIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('month');

  // Sample data - replace with actual data from your backend
  const roastingData = {
    monthlyRoasts: 48,
    averageRoastTime: '14.5',
    totalBeansRoasted: '120',
    averageTemperature: '205',
  };

  const roastingTrendsOptions = {
    chart: {
      type: 'spline',
      style: {
        fontFamily: 'Roboto, Arial, sans-serif',
      },
    },
    title: {
      text: 'Roasting Trends',
      style: {
        fontSize: '18px',
      },
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      title: {
        text: 'Month',
      },
    },
    yAxis: {
      title: {
        text: 'Number of Roasts',
      },
    },
    series: [{
      name: 'Roasts',
      data: [10, 15, 12, 18, 14, 16],
      color: '#795548',
    }],
    credits: {
      enabled: false,
    },
  };

  const temperatureDistributionOptions = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Roboto, Arial, sans-serif',
      },
    },
    title: {
      text: 'Temperature Distribution',
      style: {
        fontSize: '18px',
      },
    },
    xAxis: {
      categories: ['180-190°C', '190-200°C', '200-210°C', '210-220°C'],
      title: {
        text: 'Temperature Range',
      },
    },
    yAxis: {
      title: {
        text: 'Frequency',
      },
    },
    series: [{
      name: 'Roasts',
      data: [4, 12, 20, 8],
      color: '#8d6e63',
    }],
    credits: {
      enabled: false,
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Time Range Selector */}
      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="quarter">Last Quarter</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalCafeIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary">Monthly Roasts</Typography>
              </Box>
              <Typography variant="h4">{roastingData.monthlyRoasts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary">Avg. Roast Time</Typography>
              </Box>
              <Typography variant="h4">{roastingData.averageRoastTime}min</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary">Total Beans Roasted</Typography>
              </Box>
              <Typography variant="h4">{roastingData.totalBeansRoasted}kg</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary">Avg. Temperature</Typography>
              </Box>
              <Typography variant="h4">{roastingData.averageTemperature}°C</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={roastingTrendsOptions}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={temperatureDistributionOptions}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatisticsPage;
