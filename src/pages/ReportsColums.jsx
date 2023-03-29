
import { Box, Button, Checkbox, FormControl, Grid, Stack, Typography } from "@mui/material";
import { useAppContext } from "../content/Provider";




function ReportColums() {
  /* extraer parametros de contexto */
  const { selectMenu, setSelectMenu, handleCheckColumn } = useAppContext();
 console.log(selectMenu)
  /* controlar el chequeo de las columnas a exportar */
  const handleCheckState = (index) => {
    // console.log("selectMenu.columnas", selectMenu.columnas);
    handleCheckColumn(
      selectMenu.columnas.map((item, currentIndex) =>
        currentIndex === index ? { ...item, estado: !item.estado } : item
      )
    );
  };
  

  /* Manejar chequeo de todos los items */
  const handleCheckAllBtn = (state) => {
    handleCheckColumn(selectMenu.columnas.map((item) => ({ ...item, estado: state })));
  };

  return (
    <Box>
      <FormControl >
        <Typography marginTop={2} ><b>Seleccione columnas a imprimir en el reporte</b></Typography>
       
        <Stack alignContent={"center"} mb="3">
          <Grid >
            <Button variant="contained" color='secondary' 
            size='small'>
              Marcar todos
            </Button>
            <Button sx={{ marginLeft: 1 }} variant="contained"
             color='error' size='small' >
              Desmarcar todos
            </Button>
          </Grid>
        </Stack>
      </FormControl>
        
      <Box maxH={400} overflowY="scroll" pl={1}>
        <Stack spacing={1} align="stretch">
         
            <Box  h="30px">
              <Checkbox
                
               
              >
                
              </Checkbox>
            </Box>
        
        </Stack>
      </Box>
    </Box>
  );
}

export default ReportColums;

