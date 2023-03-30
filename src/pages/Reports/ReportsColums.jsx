import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ReportButtons from "../../components/Reports/ReportButtons";
import { useAppContext } from "../../content/Provider";

function ReportColums() {
  /* extraer parametros de contexto */
  const { selectMenu, menuList, handleCheckColumn } = useAppContext([]);

  /* traer el listado de las columnas del provider*/
  console.log("Arreglo de las columnas", selectMenu);
  console.log("Arreglo de la lista del menu", menuList);

  /* Marcar los checks*/
  const handleCheckState = (index) => {
    handleCheckColumn(
      selectMenu.columnas.map((item, currentIndex) =>
        currentIndex === index ? { ...item, estado: !item.estado } : item
      )
    );
  };

  /* Manejar chequeo de todos los items */
  const handleCheckAllBtn = (state) => {
    handleCheckColumn(
      selectMenu.columnas?.map((item) => ({ ...item, estado: state }))
    );
  };

  return (
    <Box>
      <FormControl>
        <Grid container marginTop={2}>
         <Grid>
          <Typography  marginRight={95}>
          <b>Seleccione columnas a imprimir en el reporte</b>
        </Typography>
         </Grid>
          <Grid>
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
        
        <Stack alignContent={"center"} mb="3">
          <Grid>
           
            
          </Grid>
        </Stack>
      </FormControl>

      <Box>
        <Stack>
          {selectMenu.columnas.map((item, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.estado}
                  onChange={() => {
                    handleCheckState(index);
                  }}
                />
              }
              label={item.nombre}
              key={index}
            />
          ))}
        </Stack>
      </Box>
      
    </Box>
  );
}

export default ReportColums;
