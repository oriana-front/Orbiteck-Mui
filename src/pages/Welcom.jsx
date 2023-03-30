import { Container, Typography } from "@mui/material";
import React from "react";
import { DrawerHeader } from "../components/Menu/MenuLista";

function Welcom() {
  return (
    <>
      <DrawerHeader />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h2" align="center">
          Bienvenidos al sistema de reportes
        </Typography>
        <Container maxWidth="md" sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1" align="center">
            Desde este sistema usted podrá ejecutar y guardar reportes de sus unidades!. En la barra izquierda
            encontrará grupos de reportes y dentro de ellos cada reporte a ejecutar.
          </Typography>
        </Container>
      </Container>
    </>
  );
}

export default Welcom;
