import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EmailIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Email
                    </Typography>
                    <Typography>contact@roastmaster.com</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PhoneIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Phone
                    </Typography>
                    <Typography>+1 (555) 123-4567</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <LocationIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Address
                    </Typography>
                    <Typography>
                      123 Coffee Street
                      <br />
                      Roasting District
                      <br />
                      Bean City, BC 12345
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Follow Us
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" aria-label="Facebook">
                      <FacebookIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="Twitter">
                      <TwitterIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="Instagram">
                      <InstagramIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Send us a Message
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Have questions about our services? Fill out the form below and we'll get back to you as soon as possible.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SendIcon />}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
