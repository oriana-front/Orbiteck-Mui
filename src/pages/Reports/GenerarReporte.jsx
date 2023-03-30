import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DrawerHeader } from "../../components/Menu/MenuLista";
import { Container, margin } from "@mui/system";
import { grey, red } from "@mui/material/colors";
import ReportsColums from "./ReportsColums";
import ReportsOpcions from "./ReportsOpcions";
import ReportsUnidades from "./ReportsUnidades";
import ReportsSave from "./ReportsSave";
import Provider, { useAppContext } from "../../content/Provider";
import { useReportContext } from "../../content/ReportProvider";

const steps = ["Fecha y Unidades", "Opciones", "Columnas", "Finalizar"];

export default function GenerarReporte({ prev_index = null, next_index = null } ) {
  const { setTabIndex, generateReportData } = useReportContext();
  const{selectMenu}=useAppContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  
 
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (index) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ReportsUnidades />;
      case 1:
        return <ReportsOpcions />;
      case 2:
        return <ReportsColums />;
      case 3:
        return <ReportsSave />;
      default:
        return "No hay opciones para este reporte";
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <DrawerHeader />
      <Typography  margin={2} variant="h6">
        {selectMenu.descripcion}
      </Typography>
      <Container sx={{ bgcolor: grey[50]  }} maxWidth="false"  >
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Proceso fianalizado!!!
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Al inicio</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form>{getStepContent(activeStep)}</form>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Anterior
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Omitir
                  </Button>
                )}

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </>
  );
}
