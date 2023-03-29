import { Button, Checkbox, FormControl, Grid, Select, Tooltip, Typography } from '@mui/material'
import ReportTimeOptions from '../components/Reports/ReportTimeOptions'
import { Box, sizeHeight, Stack } from '@mui/system'
import React, { useState } from 'react'
import {useReportContext} from '../content/ReportProvider'

function ReportsUnidades() {
  /* extraer parametros de contexto */
  const { vehicleList, handleCheckPlate, reportData, updateReportData } = useReportContext();

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
  console.log(vehicleList)

  /* controlar el cambio de periodo */
  const handleChangePeriod = (period) => {
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


  return (
    <Box mt={3} sx={{ width: '100%' }} >
      {/*Rango de periodo*/}
      <Typography marginTop={2} ><b>Rango de fecha /periodo</b></Typography>
      <Stack spacing={2}>
        <FormControl mb={3} size="small">
          <Select 
               onChange={(e)=>{
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
          </Select>
        </FormControl>
      </Stack>



      {/*Rango de Horario*/}
      <Typography marginTop={1}><b>Selecione un horario (formato de 24 horas)</b></Typography>
      <Grid container marginLeft={4}>
        <Typography marginTop={2}><b>Inicio</b></Typography>
        <Grid item >
          <Tooltip placement="bottom-start">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select 
              > <ReportTimeOptions/>
                <ReportTimeOptions />
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>
        <Typography marginTop={2} marginLeft={2}><b>Final</b></Typography>
        <Grid item>
          <Tooltip placement="bottom-start">
            <FormControl sx={{ m: 1, width:100,height:40 }} size="small">
            <Select 
                > <ReportTimeOptions/>
              </Select>
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
            size='small' onClick={()=>{handleCheckAllBtn(true)}}>
              Marcar todos
            </Button>
            <Button sx={{ marginLeft: 1 }} variant="contained"
             color='error' size='small' onClick={()=>{handleCheckAllBtn(false)}}>
              Desmarcar todos
            </Button>
          </Grid>
        </Stack>

        <Box  >
          <Stack>
            {vehicleList.map((item,index)=>(
               <Box key={item.id}>
              <Checkbox checked={item.value} onChange={()=>handleCheckState(index)} >
                {item.vehicleList?.plate}
              </Checkbox>
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
