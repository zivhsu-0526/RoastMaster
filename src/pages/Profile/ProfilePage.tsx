import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    company: 'Coffee Roasters Inc.',
    avatar: '/path/to/avatar.jpg', // Replace with actual avatar path
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Profile Header */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profile.avatar}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                border: '4px solid',
                borderColor: 'primary.main',
              }}
            >
              {profile.name.charAt(0)}
            </Avatar>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Profile Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Name"
                  secondary={profile.name}
                  primaryTypographyProps={{ color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={profile.email}
                  primaryTypographyProps={{ color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Phone"
                  secondary={profile.phone}
                  primaryTypographyProps={{ color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Company"
                  secondary={profile.company}
                  primaryTypographyProps={{ color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
