import ReportProvider from "../content/ReportProvider";
import GenerarReporte from "./GenerarReporte";

function ReportLayout() {
  return (
    <ReportProvider>
      <GenerarReporte />
    </ReportProvider>
  );
}

export default ReportLayout;
