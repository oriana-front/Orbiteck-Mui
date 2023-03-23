import React  from "react";

import Box from '@mui/material/Box';
import { Container, Typography } from "@mui/material";
import { DrawerHeader } from "../components/Menu/MenuLista";
import MenuLista from "../components/Menu/MenuLista";

function Welcom() {
  return (
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
     <DrawerHeader/>
   <div>
     <Typography  variant="h3" >Sistema de reportes</Typography>
      <Typography variant="h6">  Desde este sistema usted podrá ejecutar y guardar reportes de sus unidades!. En la barra izquierda encontrará
          grupos de reportes y dentro de ellos cada reporte a ejecutar.</Typography>
    </div> 
  </Box>
  );
}

export default Welcom;