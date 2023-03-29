
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";



function ReportsSave() {
  /* extraer parametros de contexto */
//  const { reportData } = useReportContext();



  return (
    <Box>
      <Box>
        <Typography><b>Guardar reporte</b></Typography>
        <Typography><b>Confirme si desea guardar este reporte para ejecutarlo nuevamente en otro momento.</b></Typography>
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="guardar"
        name="radio-buttons-group"
        >
          <FormControlLabel value="guardar" control={<Radio/>} label="Guardar"></FormControlLabel>
          <FormControlLabel value="noGuardar" control={<Radio/>} label="No guardar"></FormControlLabel>
         
        </RadioGroup>
      </Box>


    </Box>
  );
}

export default ReportsSave;
