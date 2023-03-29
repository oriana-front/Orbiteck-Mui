
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Stack, Typography } from "@mui/material";
import { useAppContext } from "../content/Provider";

function ReportColums() {
  /* extraer parametros de contexto */
  const { selectMenu, setSelectMenu, menuList,handleCheckColumn } = useAppContext([]);

  /* traer el listado de las columnas del provider*/
  console.log("selectMenu.columnas", selectMenu);
  const handleCheckState = (index) => {
    handleCheckColumn(
      selectMenu.columnas.map((item, currentIndex) =>
        currentIndex === index ? { ...item, estado: !item.estado } : item
      )
    );
  };


  /* Manejar chequeo de todos los items */
  const handleCheckAllBtn = (state) => {
    handleCheckColumn(selectMenu.columnas?.map((item) => ({ ...item, estado: state })));
  };

  return (
    <Box>
      <FormControl >
        <Typography marginTop={2} ><b>Seleccione columnas a imprimir en el reporte</b></Typography>
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
      </FormControl>

      <Box>
        <Stack>
          {selectMenu.columnas?.map((iten,index)=>(
             <FormControlLabel  control={<Checkbox checked={iten.estado}
            onChange={() => { handleCheckState(index) }}
          > </Checkbox>}>
                {item.nombre}
          </FormControlLabel>
          ))}
         
        </Stack>
      </Box>
    </Box>
  );
}

export default ReportColums;

