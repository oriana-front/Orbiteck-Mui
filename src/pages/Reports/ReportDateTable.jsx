import { Box, createTheme, ThemeProvider, useTheme } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useMemo } from "react";
import { esES } from "@mui/material/locale";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import axios from "axios";

function ReportDataTable({ res, report_id, report_name, options }) {
  /* extraer parametros de contexto */
  const { selectMenu } = useAppContext();

  const theme = useTheme();
  const columns = useMemo(() => converResponseToDT(res), []);
  const toast = useToast();

  const handleExportData = (rows) => {
    /* construir arreglo con las columnas visibles */
    const visibleCells = rows[0].getVisibleCells().map((row) => {
      return row.column.id;
    });
  };

  const handleExportExcel = (rows) => {
    axios
      .get(`${baseUrlReports()}/${report_id}`, {
        headers: { "content-type": "application/x-www-form-urlencoded;charset=utf-8" },
        params: { ...options.params, format: "xlsx", name_report: report_id },
        responseType: "blob", // important
      })
      .then((response) => {
        console.log("response", response.config.params.start_date);
        const file_report_name = `${report_name} Desde ${response.config.params.start_date} Hasta ${response.config.params.end_date}`;
        saveAs(response.data, `${file_report_name}.xlsx`);
      })
      .catch(function (error) {
        toast({
          title: `No se pudo generar reporte Excel, vuelva a intentarlo...`,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <Box p={5} bg={useColorModeValue("white", "gray.900")} rounded="md" maxH="100%">
      {selectMenu.descripcion}

      {/* <ThemeProvider theme={createTheme(theme, esES)}> */}
        <MaterialReactTable
          columns={columns}
          data={res}
          localization={MRT_Localization_ES}
          initialState={{ density: "compact", pagination: { pageSize: 20, pageIndex: 0 } }}
          renderTopToolbarCustomActions={({ table }) => (
            <Box sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}>
              {res.length > 0 && (
                <>
                  <Button color="primary" startIcon={<FileDownloadIcon />} variant="contained">
                    Exportar Todo
                  </Button>
                </>
              )}
            </Box>
          )}
          defaultColumn={{
            minSize: 10, //allow columns to get smaller than default
            maxSize: 9001, //allow columns to get larger than default
            size: 30, //make columns wider by default
          }}
        />
      {/* </ThemeProvider> */}
    </Box>
  );
}

export default ReportDataTable;
