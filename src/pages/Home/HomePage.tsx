import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  Share,
  Coffee,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const features = [
  {
    icon: <Coffee sx={{ fontSize: 40 }} />,
    title: 'Record Roasting',
    description: 'Keep track of your coffee roasting process with detailed records',
    path: '/roasting-records',
  },
  {
    icon: <Timeline sx={{ fontSize: 40 }} />,
    title: 'Visualize Data',
    description: 'View your roasting data in beautiful charts and graphs',
    path: '/visualization',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    title: 'Track Progress',
    description: 'Monitor your improvement and analyze trends',
    path: '/statistics',
  },
  {
    icon: <Share sx={{ fontSize: 40 }} />,
    title: 'Share Experience',
    description: 'Share your roasting profiles with the community',
    path: '/roasting-records',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('Roast Master')}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          {t('Track, analyze, and share your coffee roasting journey')}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={t(feature.title)}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>{feature.icon}</Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {t(feature.title)}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {t(feature.description)}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(feature.path)}
                >
                  {t('Learn More')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {t('Start Your Roasting Journey')}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/roasting-records')}
          sx={{ mt: 2 }}
        >
          {t('Create Your First Record')}
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;