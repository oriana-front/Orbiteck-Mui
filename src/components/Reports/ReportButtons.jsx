
import { Save } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useReportContext } from "../../content/ReportProvider";

function ReportButtons({ prev_index = null, next_index = null }) {

  const { setTabIndex, generateReportData } = useReportContext();

 
  const handleTabChange = (index) => {
    setTabIndex(index);
  };


  const handleFinish = () => {
    generateReportData();
  };

  return (
    <Box mt="3">
     
        {prev_index !== null && (
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={() => {
              handleTabChange(prev_index);
            }}
          >
            Anterior
          </Button>
        )}

        {next_index !== null && (
          <Button
            colorScheme="pink"
            variant="solid"
            onClick={() => {
              handleTabChange(next_index);
            }}
          >
            Siguiente
          </Button>
        )}

        <Button rightIcon={<Save/>} colorScheme="blue" variant="outline" onClick={handleFinish}>
          Finalizar
        </Button>
     
    </Box>
  );
}

export default ReportButtons;
