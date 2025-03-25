import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import RoastingRecordCard from './RoastingRecordCard';
import RoastingRecordForm from './RoastingRecordForm';
import { RoastingRecord } from '../../types';

// Dummy data for demonstration
const dummyRecords: RoastingRecord[] = [
  {
    id: 1,
    beanName: 'Ethiopian Yirgacheffe',
    roastLevel: 'Medium',
    firstCrackTime: 8,
    firstCrackTemperature: 200,
    secondCrackTime: 10,
    secondCrackTemperature: 220,
    greenCoffeeWeight: 500,
    roastedCoffeeWeight: 450,
    temperatures: [
      { time: 0, temperature: 25 },
      { time: 2, temperature: 100 },
      { time: 4, temperature: 150 },
      { time: 6, temperature: 180 },
      { time: 8, temperature: 200 },
      { time: 10, temperature: 220 },
    ],
    productionArea: 'Yirgacheffe',
    processingMethod: 'Washed',
    date: new Date(), 
    notes: 'Floral aroma with citrus notes',
  },
];

const RoastingRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<RoastingRecord[]>(dummyRecords);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editRecord, setEditRecord] = useState<RoastingRecord | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<boolean>(false);

  const handleAddRecord = (recordData: Omit<RoastingRecord, 'id' | 'date'>) => {
    const newRecord: RoastingRecord = {
      ...recordData,
      id: records.length + 1,
      date: new Date(),
    };
    setRecords([...records, newRecord]);
    setFormOpen(false);
  };

  const handleEditRecord = (recordData: Omit<RoastingRecord, 'id' | 'date'>) => {
    if (editRecord) {
      const updatedRecord: RoastingRecord = {
        ...recordData,
        id: editRecord.id,
        date: editRecord.date,
      };
      setRecords(records.map((r) => (r.id === editRecord.id ? updatedRecord : r)));
      setEditRecord(undefined);
      setFormOpen(false);
    }
  };

  const handleDeleteRecord = (record: RoastingRecord) => {
    setRecords(records.filter((r) => r.id !== record.id));
  };

  const filteredRecords = records.filter((record) =>
    record.beanName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Roasting Records
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setFormOpen(true)}
        >
          New Record
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search records..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredRecords.map((record) => (
          <Grid item key={record.id} xs={12} sm={6} md={4}>
            <RoastingRecordCard
              record={record}
              onEdit={(record) => {
                setEditRecord(record);
                setFormOpen(true);
              }}
              onDelete={handleDeleteRecord}
              onShare={(record) => console.log('Share:', record)}
              onView={(record) => {
                setEditRecord(record);
                setFormOpen(true);
                setViewMode(true);
              }}
            />
          </Grid>
        ))}
      </Grid>

      <RoastingRecordForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditRecord(undefined);
          setViewMode(false);
        }}
        onSubmit={editRecord ? handleEditRecord : handleAddRecord}
        initialData={editRecord}
        viewMode={viewMode}
      />
    </Container>
  );
};

export default RoastingRecordsPage;
