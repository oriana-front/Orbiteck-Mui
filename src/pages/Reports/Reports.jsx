import React from "react";
import MenuLista from "../../components/Menu/MenuLista";
import ReportProvider from "../../content/ReportProvider";

function Reports() {
  return (
    <ReportProvider>
      <MenuLista />
    </ReportProvider>
  );
}

export default Reports;
