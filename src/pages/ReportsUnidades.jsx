import { Button, Checkbox, FormControl, FormControlLabel, Grid, Input, ListItemText, Select, Tooltip, Typography } from '@mui/material'
import ReportTimeOptions from '../components/Reports/ReportTimeOptions'
import { Box, sizeHeight, Stack } from '@mui/system'
import React, { useState } from 'react'
import { useReportContext } from '../content/ReportProvider'

function ReportsUnidades() {
  /* extraer parametros de contexto */
  const { vehicleList, handleCheckPlate, reportData, updateReportData, showDatePicker, setShowDatePicker } = useReportContext();

  /* controlar el marcado de todos los elementos (chequeo) */
  const handleCheckAllBtn = (enable) => {
    handleCheckPlate(vehicleList.map((item) => ({ ...item, value: enable })));
  };

  /* controlar el chequeo de cada vehiculo */
  const handleCheckState = (index) => {
    handleCheckPlate(
      vehicleList.map((item, currentIndex) => (currentIndex === index ? { ...item, value: !item.value } : item))
    );
  };
  console.log(showDatePicker)

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
    <Box mt={3} sx={{ width: '100%' }} >
      {/*Rango de periodo*/}
      <Typography marginTop={2} ><b>Periodo</b></Typography>
      <FormControl mb={3} size="medium">
        <select
          onChange={(e) => {
            handleChangePeriod(e.target.value)
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
        </select>
      </FormControl>

      {showDatePicker ? (
        <FormControl mb={3} sx={{ m: 1, minWidth: 120 }} size="medium" >
          <Typography ><b>Rango de fechas</b></Typography>
          <Stack>
            <Grid>
              <FormControl>
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
             
              <Input
                placeholder="Fecha Final"
                size="md"
                type="date"
                value={reportData.selectEndDate}
                onChange={(e) => {
                  handleChangeEndDate(e.target.value);
                }}
              />

            </Grid>

          </Stack>
        </FormControl>
      ) : (
        ""
      )}

      {/*Rango de Horario*/}
      <Typography marginTop={1}><b>Selecione un horario (formato de 24 horas)</b></Typography>
      <Grid container marginLeft={4}>
        <Typography marginTop={1}><b>Inicio</b></Typography>
        <Grid item >
          <Tooltip placement="bottom-start">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
              <select
                onChange={(e) => {
                  handleChangeStartHour(e.target.value);
                }}
                defaultValue={reportData.selectStartHour}
              > <ReportTimeOptions />
              </select>
            </FormControl>
          </Tooltip>
        </Grid>
        <Typography marginTop={1} marginLeft={2}><b>Final</b></Typography>
        <Grid item>
          <Tooltip placement="bottom-start">
            <FormControl sx={{ m: 1, width: 100, height: 40 }} size="medium" >
              <select
                onChange={(e) => {
                  handleChangeEndtHour(e.target.value);
                }}
                defaultValue={reportData.selectEndHour}
              > <ReportTimeOptions />
              </select>
            </FormControl>
          </Tooltip>
        </Grid>
      </Grid>
      {/*Selecionar unidades*/}
      <Typography marginTop={2}><b>Selecione unidades</b></Typography>
      <FormControl mb={3}>
        <Stack alignContent={"center"} mb="3">
          <Grid >
            <Button variant="contained" color='secondary'
              size='small' onClick={() => { handleCheckAllBtn(true) }}>
              Marcar todos
            </Button>
            <Button sx={{ marginLeft: 1 }} variant="contained"
              color='error' size='small' onClick={() => { handleCheckAllBtn(false) }}>
              Desmarcar todos
            </Button>
          </Grid>
        </Stack>

        <Box  >
          <Stack>
            {vehicleList.map((item, index) => (
              <Box key={item.id} height={30}>
                <FormControlLabel control={<Checkbox checked={item.value} onChange={() => handleCheckState(index)} />} label={item.plate} />
              </Box>
            ))
            }

          </Stack>
        </Box>
      </FormControl>
    </Box>
  )
}

export default ReportsUnidades
