import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  Tooltip,
  Select,
  Typography,
  Toolbar,
} from "@mui/material";
import ReportTimeOptions from "../../components/Reports/ReportTimeOptions";
import { Box, sizeHeight, Stack } from "@mui/system";
import React, { useState } from "react";
import { useReportContext } from "../../content/ReportProvider";
import ReportButtons from "../../components/Reports/ReportButtons";
import { Fullscreen } from "@mui/icons-material";

function ReportsUnidades() {
  /* extraer parametros de contexto */
  const {
    vehicleList,
    handleCheckPlate,
    reportData,
    updateReportData,
    showDatePicker,
    setShowDatePicker,
  } = useReportContext();

  /* controlar el marcado de todos los elementos (chequeo) */
  const handleCheckAllBtn = (enable) => {
    handleCheckPlate(vehicleList.map((item) => ({ ...item, value: enable })));
  };

  /* controlar el chequeo de cada vehiculo */
  const handleCheckState = (index) => {
    handleCheckPlate(
      vehicleList.map((item, currentIndex) =>
        currentIndex === index ? { ...item, value: !item.value } : item
      )
    );
  };

  /* controlar el cambio de periodo */
  const handleChangePeriod = (period) => {
    setShowDatePicker(period === "custom");
    updateReportData({ selectPeriod: period });
  };

  /* controlar el cambio de horario inicial */
  const handleChangeStartHour = (hour) => {
    updateReportData({ selectStartHour: hour });
  };

  /* controlar el cambio de horario final */
  const handleChangeEndtHour = (hour) => {
    updateReportData({ selectEndHour: hour });
  };
  /*Editar fecha */
  const handleChangeStartDate = (date) => {
    updateReportData({ selectStartDate: date });
  };

  const handleChangeEndDate = (date) => {
    updateReportData({ selectEndDate: date });
  };

  return (
    <Box mt={3} sx={{ width: "100%" }}>
      {/*Rango de periodo*/}
      <Typography marginTop={2}>
        <b>Periodo</b>
      </Typography>
      <Stack spacing={2}>
        <FormControl sx={{ m: 1 }} size="small" mb={3}>
          <Select
            native
            onChange={(e) => {
              handleChangePeriod(e.target.value);
            }}
            defaultValue={reportData.selectPeriod}
          >
            <option value="today">Hoy</option>
            <option value="yesterday">Ayer</option>
            <option value="-1 day">Ayer y hoy</option>
            <option value="-2 days">Hace 2 días</option>
            <option value="-1 week">Ultima semana</option>
            <option value="last Sunday">Ultimo fin de semana</option>
            <option value="-2 week">Ultimas 2 semanas</option>
            <option value="-1 month">Ultimo mes</option>
            <option value="custom">Seleccionar fechas manualmente</option>
          </Select>
        </FormControl>
      </Stack>
      {showDatePicker ? (
        <FormControl mb={3} sx={{ m: 1, minWidth: 120 }} size="small">
          <Typography>
            <b>Rango de fechas</b>
          </Typography>
          <Stack>
            <Grid>
              <FormControl mb={3} sx={{ m: 1, minWidth: 120 }}>
                <Input
                  placeholder="Fecha Inicio"
                  size="md"
                  type="date"
                  value={reportData.selectStartDate}
                  onChange={(e) => {
                    handleChangeStartDate(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl mb={3} sx={{ m: 1, minWidth: 120 }}>
                <Input
                  placeholder="Fecha Final"
                  size="md"
                  type="date"
                  value={reportData.selectEndDate}
                  onChange={(e) => {
                    handleChangeEndDate(e.target.value);
                  }}
                />
              </FormControl>
            </Grid>
          </Stack>
        </FormControl>
      ) : (
        ""
      )}
      {/*Rango de Horario*/}
      <Typography marginTop={1}>
        <b>Selecione un horario (formato de 24 horas)</b>
      </Typography>
      <Stack>
        <Grid container marginLeft={4}>
          <Typography marginTop={2}>
            <b>Inicio</b>
          </Typography>
          <Grid item>
            <Tooltip placement="bottom-start">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  native
                  onChange={(e) => {
                    handleChangeStartHour(e.target.value);
                  }}
                  defaultValue={reportData.selectStartHour}
                >
                  {" "}
                  <ReportTimeOptions />
                </Select>
              </FormControl>
            </Tooltip>
          </Grid>
          <Typography marginTop={2} marginLeft={2}>
            <b>Final</b>
          </Typography>
          <Grid item>
            <Tooltip placement="bottom-start">
              <FormControl sx={{ m: 1, width: 100, height: 40 }} size="small">
                <Select
                  native
                  onChange={(e) => {
                    handleChangeEndtHour(e.target.value);
                  }}
                  defaultValue={reportData.selectEndHour}
                >
                  {" "}
                  <ReportTimeOptions />
                </Select>
              </FormControl>
            </Tooltip>
          </Grid>
        </Grid>
      </Stack>
      
      {/*Selecionar unidades*/}
      <FormControl mb={3}>
        <Grid container >
          <Grid margin={1}>
            <Typography marginRight={120} >
              <b>Selecione unidades</b>
            </Typography>
          </Grid>
          <Grid >
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                handleCheckAllBtn(true);
              }}
            >
              Marcar todos
            </Button>
          </Grid>
          <Grid>
            <Button
              sx={{ marginLeft: 1 }}
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                handleCheckAllBtn(false);
              }}
            >
              Desmarcar todos
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      <Box marginLeft={2}>
        <Stack>
          {vehicleList.map((item, index) => (
            <Box key={item.id} height={30}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.value}
                    onChange={() => handleCheckState(index)}
                  />
                }
                label={item.plate}
              />
            </Box>
          ))}
        </Stack>
      </Box>{" "}
      
    </Box>
  );
}

export default ReportsUnidades;
