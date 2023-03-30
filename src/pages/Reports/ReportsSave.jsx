import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ReportButtons from "../../components/Reports/ReportButtons";

function ReportsSave() {
  /* extraer parametros de contexto */
  //  const { reportData } = useReportContext();

  return (
    <Box>
      <Box>
        <Typography margin={2}>
          <b>Guardar reporte</b>
        </Typography>
        <Typography margin={2}>
          <b>
            Confirme si desea guardar este reporte para ejecutarlo nuevamente en
            otro momento.
          </b>
        </Typography>
        
        <RadioGroup
          sx={{margin:2}}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="guardar"
            control={<Radio />}
            label="Guardar"
          ></FormControlLabel>
          <FormControlLabel
            value="noGuardar"
            control={<Radio />}
            label="No guardar"
          ></FormControlLabel>
        </RadioGroup>
      </Box>

    
    </Box>
  );
}

export default ReportsSave;
