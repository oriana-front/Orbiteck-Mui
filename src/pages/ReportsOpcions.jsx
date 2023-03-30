import Select from "react-select";
import { Box } from "@mui/system";
import { FormControl, FormLabel, Typography } from "@mui/material";
import { useReportContext } from "../content/ReportProvider";
import { useAppContext } from "../content/Provider";

function ReportsOption() {
  /* extraer parametros de contexto */
  const { selectMenu, setSelectMenu, handleCheckColumn } = useAppContext();
  const { geozoneList, paramsOptions, setParamsOptions } = useReportContext();
  //console.log("selectMenu", selectMenu);

  /* leer parametros (de existir) para generar elementos */
  let params = [];
  if (selectMenu.hasOwnProperty("parametros")) {
    params = selectMenu.parametros;
  }

  const handleOnchangeSelect = (value) => {
    const newVal = { ...paramsOptions, options: value.value };

    setParamsOptions(newVal);
  };

  console.log(selectMenu);
  const handleOnchangeGeozone = (value) => {};

  return (
    <Box>
      {params.length == 0 ? (
        <Typography>
          No hay opciones para este reporte, favor de pasar al siguiente
          apartado!
        </Typography>
      ) : (
        ""
      )}

      {params.map((value, index) => {
        if (value.tipo === "select") {
          const options = value.opciones.map((option) => ({
            value: option[1],
            label: option[0],
          }));

          return (
            <FormControl key={index}>
              <FormLabel>{value.descripcion}</FormLabel>
              <Select
                options={options}
                placeholder="Seleccionar"
                noOptionsMessage={() => "No hay coincidencias"}
                onChange={handleOnchangeSelect}
              />
            </FormControl>
          );
        } else if (value.tipo === "geozone") {
          const geozoneOptions = geozoneList.map((item) => ({
            value: item.id,
            label: item.geozone,
          }));

          return (
            <FormControl key={index}>
              <FormLabel>Geozona</FormLabel>
              <Select
                options={geozoneOptions}
                isMulti
                placeholder="Seleccionar"
                noOptionsMessage={() => "No hay coincidencias"}
                onChange={handleOnchangeGeozone}
              />
            </FormControl>
          );
        }
      })}
    </Box>
  );
}

export default ReportsOption;
