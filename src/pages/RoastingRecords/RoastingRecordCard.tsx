import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Chip,
  Box,
} from '@mui/material';
import { Share, Visibility, Edit, Delete } from '@mui/icons-material';
import { RoastingRecordCardProps } from '../../types';

const RoastingRecordCard: React.FC<RoastingRecordCardProps> = ({
  record,
  onEdit,
  onDelete,
  onShare,
  onView,
}) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {record.beanName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Roast Level: {record.roastLevel}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Date: {record.date.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Chip
            label={`Temperature: ${record.temperature}°C`}
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
          <Chip
            label={`Duration: ${record.duration} min`}
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {record.notes}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<Share />} onClick={() => onShare(record)}>
          Share
        </Button>
        <Button size="small" startIcon={<Visibility />} onClick={() => onView(record)}>
          View
        </Button>
        <Button size="small" startIcon={<Edit />} onClick={() => onEdit(record)}>
          Edit
        </Button>
        <Button size="small" startIcon={<Delete />} onClick={() => onDelete(record)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoastingRecordCard;
