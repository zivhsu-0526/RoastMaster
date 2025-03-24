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
  const [settings, setSettings] = React.useState<Settings>({
    temperatureUnit: 'celsius',
    weightUnit: 'grams',
    timeFormat: '24h',
    language: 'en',
    notifications: true,
    defaultBatchSize: '250',
    targetTemperature: '200',
    roastingDuration: '12',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    if ('checked' in event.target) {
      // Handle checkbox change
      const { name, checked } = event.target;
      setSettings(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      // Handle text input and select change
      const { name, value } = event.target;
      setSettings(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Roasting Settings
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          {/* Units & Format Settings */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ThermostatIcon sx={{ mr: 1 }} /> Measurement Units
            </Typography>
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Temperature Unit</InputLabel>
                <Select
                  name="temperatureUnit"
                  value={settings.temperatureUnit}
                  label="Temperature Unit"
                  onChange={handleChange}
                >
                  <MenuItem value="celsius">Celsius (°C)</MenuItem>
                  <MenuItem value="fahrenheit">Fahrenheit (°F)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Weight Unit</InputLabel>
                <Select
                  name="weightUnit"
                  value={settings.weightUnit}
                  label="Weight Unit"
                  onChange={handleChange}
                >
                  <MenuItem value="grams">Grams (g)</MenuItem>
                  <MenuItem value="ounces">Ounces (oz)</MenuItem>
                  <MenuItem value="pounds">Pounds (lb)</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
              <TimerIcon sx={{ mr: 1 }} /> Time Format
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Time Format</InputLabel>
              <Select
                name="timeFormat"
                value={settings.timeFormat}
                label="Time Format"
                onChange={handleChange}
              >
                <MenuItem value="12h">12-hour</MenuItem>
                <MenuItem value="24h">24-hour</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Default Values & Preferences */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ScaleIcon sx={{ mr: 1 }} /> Default Values
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Default Batch Size"
                name="defaultBatchSize"
                value={settings.defaultBatchSize}
                onChange={handleChange}
                type="number"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Target Temperature"
                name="targetTemperature"
                value={settings.targetTemperature}
                onChange={handleChange}
                type="number"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Default Roasting Duration (minutes)"
                name="roastingDuration"
                value={settings.roastingDuration}
                onChange={handleChange}
                type="number"
              />
            </Box>

            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
              <LanguageIcon sx={{ mr: 1 }} /> Preferences
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select
                name="language"
                value={settings.language}
                label="Language"
                onChange={handleChange}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
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
                  Enable Notifications
                </Box>
              }
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            size="large"
          >
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RoastingSettingsPage;
