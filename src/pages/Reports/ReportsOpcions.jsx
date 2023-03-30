import Select from "react-select";
import { Box } from "@mui/system";
import { FormControl, FormLabel, Stack, Typography } from "@mui/material";
import { useReportContext } from "../../content/ReportProvider";
import { useAppContext } from "../../content/Provider";
import ReportButtons from "../../components/Reports/ReportButtons";

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
        <Typography marginTop={4}>
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
            <Stack spacing={2} marginRight={5} marginTop={2}>
              <FormControl key={index}>
              <FormLabel sx={{margin:1}}><b>{value.descripcion}</b></FormLabel>
              <Select
                options={options}
                placeholder="Seleccionar"
                noOptionsMessage={() => "No hay coincidencias"}
                onChange={handleOnchangeSelect}
              />
            </FormControl>
            </Stack>
            
          );
        } else if (value.tipo === "geozone") {
          const geozoneOptions = geozoneList.map((item) => ({
            value: item.id,
            label: item.geozone,
          }));

          return (
            <Stack spacing={2} marginRight={5} marginTop={2}>
              <FormControl key={index} >
                <FormLabel sx={{margin:1}}> <b>Geozona</b></FormLabel>
                <Select
                  options={geozoneOptions}
                  isMulti
                  placeholder="Seleccionar"
                  noOptionsMessage={() => "No hay coincidencias"}
                  onChange={handleOnchangeGeozone}
                />
              </FormControl>
            </Stack>
          );
        }
      })}
   
    </Box>
  );
}

export default ReportsOption;
