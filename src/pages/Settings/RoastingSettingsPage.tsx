import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  SelectChangeEvent,
} from '@mui/material';
import {
  Save as SaveIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Thermostat as ThermostatIcon,
  Scale as ScaleIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface Settings {
  temperatureUnit: string;
  weightUnit: string;
  timeFormat: string;
  language: string;
  notifications: boolean;
  defaultBatchSize: string;
  targetTemperature: string;
  roastingDuration: string;
}

const RoastingSettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = React.useState<Settings>({
    temperatureUnit: 'celsius',
    weightUnit: 'grams',
    timeFormat: '24h',
    language: i18n.language,
    notifications: true,
    defaultBatchSize: '250',
    targetTemperature: '200',
    roastingDuration: '12',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    if ('checked' in event.target) {
      const { name, checked } = event.target;
      setSettings(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      const { name, value } = event.target;
      setSettings(prev => ({
        ...prev,
        [name]: value,
      }));
      if (name === 'language') {
        i18n.changeLanguage(value);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          {t('Settings')}
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ThermostatIcon sx={{ mr: 1 }} /> {t('Measurement Units')}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{t('Temperature Unit')}</InputLabel>
                <Select
                  name="temperatureUnit"
                  value={settings.temperatureUnit}
                  label={t('Temperature Unit')}
                  onChange={handleChange}
                >
                  <MenuItem value="celsius">Celsius (°C)</MenuItem>
                  <MenuItem value="fahrenheit">Fahrenheit (°F)</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>{t('Weight Unit')}</InputLabel>
                <Select
                  name="weightUnit"
                  value={settings.weightUnit}
                  label={t('Weight Unit')}
                  onChange={handleChange}
                >
                  <MenuItem value="grams">Grams (g)</MenuItem>
                  <MenuItem value="ounces">Ounces (oz)</MenuItem>
                  <MenuItem value="pounds">Pounds (lb)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
              <TimerIcon sx={{ mr: 1 }} /> {t('Time Format')}
            </Typography>
            <FormControl fullWidth>
              <InputLabel>{t('Time Format')}</InputLabel>
              <Select
                name="timeFormat"
                value={settings.timeFormat}
                label={t('Time Format')}
                onChange={handleChange}
              >
                <MenuItem value="12h">12-hour</MenuItem>
                <MenuItem value="24h">24-hour</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ScaleIcon sx={{ mr: 1 }} /> {t('Default Values')}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label={t('Default Batch Size')}
                name="defaultBatchSize"
                value={settings.defaultBatchSize}
                onChange={handleChange}
                type="number"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label={t('Target Temperature')}
                name="targetTemperature"
                value={settings.targetTemperature}
                onChange={handleChange}
                type="number"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label={t('Default Roasting Duration (minutes)')}
                name="roastingDuration"
                value={settings.roastingDuration}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
              <LanguageIcon sx={{ mr: 1 }} /> {t('Preferences')}
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{t('Language')}</InputLabel>
              <Select
                name="language"
                value={settings.language}
                label={t('Language')}
                onChange={handleChange}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="zh-TW">繁體中文</MenuItem>
                <MenuItem value="ja">日本語</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications}
                  onChange={handleChange}
                  name="notifications"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NotificationsIcon sx={{ mr: 1 }} />
                  {t('Enable Notifications')}
                </Box>
              }
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} size="large">
            {t('Save Settings')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RoastingSettingsPage;