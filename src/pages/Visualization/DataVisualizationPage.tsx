import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';

interface ChartOptions {
  title: {
    text: string;
  };
  xAxis?: {
    title?: {
      text: string;
    };
    categories?: string[];
  };
  yAxis?: {
    title?: {
      text: string;
    };
  };
  chart?: {
    type?: string;
  };
  series: Array<{
    name: string;
    data: Array<number | [string, number]>;
  }>;
}

const temperatureData: ChartOptions = {
  title: {
    text: 'Roasting Temperature Profile',
  },
  xAxis: {
    title: {
      text: 'Time (minutes)',
    },
  },
  yAxis: {
    title: {
      text: 'Temperature (°C)',
    },
  },
  series: [
    {
      name: 'Temperature',
      data: [150, 175, 190, 200, 210, 215, 205, 195],
    },
  ],
};

const roastLevelDistribution: ChartOptions = {
  chart: {
    type: 'pie',
  },
  title: {
    text: 'Roast Level Distribution',
  },
  series: [
    {
      name: 'Roast Levels',
      data: [
        ['Light', 20],
        ['Medium Light', 25],
        ['Medium', 30],
        ['Medium Dark', 15],
        ['Dark', 10],
      ],
    },
  ],
};

const beanOriginDistribution: ChartOptions = {
  chart: {
    type: 'bar',
  },
  title: {
    text: 'Bean Origin Distribution',
  },
  xAxis: {
    categories: ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala', 'Kenya'],
    title: {
      text: 'Number of Roasts',
    },
  },
  yAxis: {
    title: {
      text: 'Quantity',
    },
  },
  series: [
    {
      name: 'Roasts',
      data: [15, 12, 10, 8, 5],
    },
  ],
};

const DataVisualizationPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('Data Visualization')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                ...temperatureData,
                title: { text: t('Roasting Temperature Profile') },
                xAxis: { title: { text: t('Time (minutes)') } },
                yAxis: { title: { text: t('Temperature (°C)') } },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                ...roastLevelDistribution,
                title: { text: t('Roast Level Distribution') },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                ...beanOriginDistribution,
                title: { text: t('Bean Origin Distribution') },
                xAxis: {
                  categories: beanOriginDistribution.xAxis?.categories,
                  title: { text: t('Number of Roasts') },
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DataVisualizationPage;