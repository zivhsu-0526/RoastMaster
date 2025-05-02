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
import { useTranslation } from 'react-i18next';

const RoastingRecordCard: React.FC<RoastingRecordCardProps> = ({
  record,
  onEdit,
  onDelete,
  onShare,
  onView,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {record.beanName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('Roast Level')}: {record.roastLevel}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('Date')}: {record.date.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Chip
            label={`First Crack Time: ${record.firstCrackTime}`}
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
          <Chip
            label={`First Crack Temperature: ${record.firstCrackTime}°C`}
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
          {t('Share')}
        </Button>
        <Button size="small" startIcon={<Visibility />} onClick={() => onView(record)}>
          {t('View')}
        </Button>
        <Button size="small" startIcon={<Edit />} onClick={() => onEdit(record)}>
          {t('Edit')}
        </Button>
        <Button size="small" startIcon={<Delete />} onClick={() => onDelete(record)}>
          {t('Delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoastingRecordCard;