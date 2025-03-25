import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { RoastingRecordFormProps, RoastingRecord } from "../../types";
import Highcharts from "highcharts";
import { AddCircleOutline, ShowChart, Delete } from "@mui/icons-material";

const roastLevels = [
  "Light",
  "Medium Light",
  "Medium",
  "Medium Dark",
  "Dark",
] as const;

const RoastingRecordForm: React.FC<RoastingRecordFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  viewMode,
}) => {
  const [formData, setFormData] = useState<RoastingRecord>({
    id: 0,
    beanName: "",
    productionArea: "",
    greenCoffeeWeight: 0,
    roastedCoffeeWeight: 0,
    processingMethod: "",
    roastLevel: "Medium",
    temperatures: [],
    date: new Date(),
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      const { id, date, ...rest } = initialData;
      setFormData((prev) => ({
        ...prev,
        ...rest,
      }));
    } else {
      setFormData({
        id: 0,
        beanName: "",
        productionArea: "",
        greenCoffeeWeight: 0,
        roastedCoffeeWeight: 0,
        processingMethod: "",
        roastLevel: "Medium",
        temperatures: [],
        date: new Date(),
        notes: "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (viewMode && open && formData.temperatures.length > 0) {
      drawChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, open, formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: ["firstCrackTime", "secondCrackTime"].includes(name)
          ? Number(value)
          : value,
      };

      // Calculate temperatures based on times
      if (
        name === "firstCrackTime" &&
        updatedFormData.firstCrackTime !== undefined
      ) {
        const temp = updatedFormData.temperatures.find(
          (t) => t.time === updatedFormData.firstCrackTime
        );
        updatedFormData.firstCrackTemperature = temp?.temperature;
      }

      if (
        name === "secondCrackTime" &&
        updatedFormData.secondCrackTime !== undefined
      ) {
        const temp = updatedFormData.temperatures.find(
          (t) => t.time === updatedFormData.secondCrackTime
        );
        updatedFormData.secondCrackTemperature = temp?.temperature;
      }

      return updatedFormData;
    });
  };

  const handleTemperatureChange = (
    index: number,
    field: "time" | "temperature",
    value: number
  ) => {
    setFormData((prev) => {
      const updatedTemperatures = [...prev.temperatures];
      updatedTemperatures[index] = {
        ...updatedTemperatures[index],
        [field]: value,
      };
      return { ...prev, temperatures: updatedTemperatures };
    });
  };

  const addTemperatureRow = () => {
    setFormData((prev) => ({
      ...prev,
      temperatures: [...prev.temperatures, { time: 0, temperature: 0 }],
    }));
  };

  const removeTemperatureRow = (index: number) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        temperatures: prev.temperatures.filter((_, i) => i !== index),
      };
      // Redraw chart if there are still enough temperature points
      if (newData.temperatures.length >= 2) {
        setTimeout(() => drawChart(), 0);
      } else {
        // Clear chart if not enough points
        const chart = Highcharts.charts.find(
          (chart) => (chart as any)?.renderTo?.id === "roasting-chart-container"
        );
        if (chart) {
          chart.destroy();
        }
      }
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const drawChart = useCallback(() => {
    const rawData = formData.temperatures
      .filter((t) => !isNaN(t.time) && !isNaN(t.temperature))
      .sort((a, b) => a.time - b.time);

    const filled = [];
    for (let i = 0; i < rawData.length - 1; i++) {
      const [t1, v1] = [rawData[i].time, rawData[i].temperature];
      const [t2, v2] = [rawData[i + 1].time, rawData[i + 1].temperature];
      for (let t = t1; t < t2; t++) {
        const ratio = (t - t1) / (t2 - t1);
        const val = v1 + ratio * (v2 - v1);
        filled.push([t, Math.round(val * 10) / 10]);
      }
    }
    filled.push([
      rawData[rawData.length - 1].time,
      rawData[rawData.length - 1].temperature,
    ]);

    Highcharts.chart("roasting-chart-container", {
      chart: { type: "spline", animation: true },
      credits: { enabled: false },
      title: { text: "Roasting Temperature Curve" },
      xAxis: { title: { text: "Time (minutes)" }, allowDecimals: false },
      yAxis: { title: { text: "Temperature (°C)" } },
      tooltip: {
        pointFormat: "Temperature: <b>{point.y}°C</b><br>Time: {point.x} min",
      },
      series: [{ type: "spline", name: "Temperature", data: filled }],
    });
  }, [formData.temperatures]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {viewMode
          ? "View Roasting Record"
          : initialData
          ? "Edit Roasting Record"
          : "New Roasting Record"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bean Name"
                name="beanName"
                value={formData.beanName}
                onChange={handleChange}
                required
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Production Area"
                name="productionArea"
                value={formData.productionArea}
                onChange={handleChange}
                required
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Processing Method"
                name="processingMethod"
                value={formData.processingMethod}
                onChange={handleChange}
                required
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Roast Level"
                name="roastLevel"
                value={formData.roastLevel}
                onChange={handleChange}
                required
                disabled={viewMode}
              >
                {roastLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="First Crack Time (minutes)"
                name="firstCrackTime"
                value={formData.firstCrackTime || ""}
                onChange={handleChange}
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Second Crack Time (minutes)"
                name="secondCrackTime"
                value={formData.secondCrackTime || ""}
                onChange={handleChange}
                disabled={viewMode}
              />
            </Grid>
            {/* Display calculated temperatures */}
            {!viewMode && (
              <>
                <Grid item xs={12}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Time (min)</TableCell>
                        <TableCell>Temperature (°C)</TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.temperatures.map((temp, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              type="number"
                              value={temp.time}
                              onChange={(e) =>
                                handleTemperatureChange(
                                  index,
                                  "time",
                                  Number(e.target.value)
                                )
                              }
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={temp.temperature}
                              onChange={(e) =>
                                handleTemperatureChange(
                                  index,
                                  "temperature",
                                  Number(e.target.value)
                                )
                              }
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => removeTemperatureRow(index)}
                              size="small"
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    onClick={addTemperatureRow}
                    sx={{ width: "100%" }}
                    startIcon={<AddCircleOutline />}
                  >
                    Add Temperature
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={drawChart}
                    sx={{ width: "100%" }}
                    disabled={formData.temperatures.length < 2}
                    startIcon={<ShowChart />}
                  >
                    View Chart
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <div
                id="roasting-chart-container"
                style={{ width: "100%", height: "300px" }}
              ></div>
            </Grid>
            {!viewMode ? (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  disabled
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        {!viewMode && (
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {initialData ? "Save Changes" : "Create Record"}
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};

export default RoastingRecordForm;
