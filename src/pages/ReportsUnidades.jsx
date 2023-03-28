import { Button, Checkbox, FormControl, Grid, Select, Tooltip, Typography } from '@mui/material'
import ReportTimeOptions from '../components/Reports/ReportTimeOptions'
import { Box, sizeHeight, Stack } from '@mui/system'
import React, { useState } from 'react'
import {useReportContext} from '../content/ReportProvider'

function ReportsUnidades() {
  const [age, setAge] = useState('');
  const{vehicleList,handleChangePlate,resportData,updateReportData,showDatePicker,
    setShowDatePicker}=useReportContext();

    console.log(vehicleList)
  
 
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  /*Controlar combio de periodo*/
  const handleChangePeriod=(period)=>{
    setShowDatePicker(period==="custom")
    updateReportData({selectPeriod:period})
  } 



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
               defaultValue={resportData}
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
              <Select native defaultValue="" id="grouped-native-select" >
                <ReportTimeOptions />
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>
        <Typography marginTop={2} marginLeft={2}><b>Final</b></Typography>
        <Grid item>
          <Tooltip placement="bottom-start">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select native defaultValue="" id="grouped-native-select" size="small">
                <ReportTimeOptions />
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
            <Button variant="contained" color='secondary' size='small'>
              Marcar todos
            </Button>
            <Button sx={{ marginLeft: 1 }} variant="contained" color='error' size='small'>
              Desmarcar todos
            </Button>
          </Grid>
        </Stack>

        <Box maxHeight={300} overflow="scroll" pl={1}>
          <Stack>
            <Box>
              <Checkbox checked ></Checkbox>
            </Box>
          </Stack>
        </Box>
      </FormControl>
    </Box>
  )
}

export default ReportsUnidades
