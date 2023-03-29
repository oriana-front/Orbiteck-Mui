import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "./Provider";

import { baseUrl, baseUrlReports } from "../helpers/config";

import { getLoginToken, getUserData } from "../helpers/localStorage";
import { DateTime } from "luxon";

export const ReportContext = createContext(null);
export const useReportContext = () => useContext(ReportContext);

function ReportProvider({ children }) {
  const dt = DateTime.now();

  /* extraer parametros de contexto */
  const { selectMenu, replaceContent } = useAppContext();

  /* manejo de estados de elementos */
  const [isLoading, setisLoading] = useState(true);
  const [reportData, setReportData] = useState({
    // -- definicion de valores BASE para combos/checkbox
    selectPeriod: "today",
    selectStartHour: "00:00",
    selectEndHour: "23:59",
    radioSaveReport: "0",
    selectStartDate: dt.minus({ days: 3 }).toFormat("yyyy-MM-dd"),
    selectEndDate: dt.toFormat("yyyy-MM-dd"),
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [vehicleList, setVehicleList] = useState([]);
  const [geozoneList, setGeozoneList] = useState([]);
  const [paramsOptions, setParamsOptions] = useState({}); // -- guardar opciones de reporte (llave valor)
  const [showDatePicker, setShowDatePicker] = useState(false);

  const user_data = getUserData();

  const getDateInterval = () => {
    const interval = reportData.selectPeriod;
    if (interval === "+0 day") {
      return { ds: dt.toISODate(), de: dt.toISODate() };
    } else if (interval === "-24 hours") {
      return { ds: dt.toISODate(), de: dt.toISODate() };
    } else if (interval === "yesterday") {
      return { ds: dt.minus({ days: 1 }).toISODate(), de: dt.minus({ days: 1 }).toISODate() };
    } else if (interval === "-2 day") {
      return { ds: dt.minus({ days: 2 }).toISODate(), de: dt.minus({ days: 2 }).toISODate() };
    } else if (interval === "-1 day") {
      return { ds: dt.minus({ days: 1 }).toISODate(), de: dt.toISODate() };
    }
  };

  /* obtener listado de vehiculos desde BACK */
  const getVehicles = () => {
    // -- https://orbitecsac.com/devices-lite?limit=100&offset=0&search&ordering=-created&users__username=guapolindo
    const options = {
      headers: {
        Authorization: `token ${getLoginToken()}`,
      },
    };
    axios
      .get(`${baseUrl()}/devices-lite?limit=10000&ordering=name&users__username=${user_data.username}`, options)
      .then((res) => {
        // console.log("ReportLayout => res.data", res.data);
        const resData = res.data.data.results;
        const newVehicleList = resData.map((item) => ({
          id: item.id,
          plate: item.vehicle?.plate,
          value: false,
        }));
        setVehicleList(newVehicleList);
        setisLoading(false);
        // console.log("newVehicleList", newVehicleList);
      });
  };

  const getGeozones = () => {
    // -- https://orbitecsac.com/geozones-lite?limit=100&users__username=orbitec
    const options = {
      headers: {
        Authorization: `token ${getLoginToken()}`,
      },
    };
    axios.get(`${baseUrl()}/geozones-lite?limit=100&users__username=${user_data.username}`, options).then((res) => {
      //console.log("getGeozones => res.data", res.data.data?.results?.features);
      const resData = res.data.data?.results?.features;
      const newGeozoneList = resData.map((item) => ({
        id: item.id,
        geozone: item.properties.name,
      }));
      setGeozoneList(newGeozoneList);
    });
  };

  const updateReportData = (data) => {
    // console.log("updateReportData", data);
    setReportData({ ...reportData, ...data });
  };

  const clearReportData = () => {};

  const handleCheckPlate = (updateVehicleList) => {
    setVehicleList(updateVehicleList);
  };

  const validateVehiclesChecked = () => {
    const findObj = vehicleList.find((item) => item.value === true);
    return typeof findObj === "undefined";
    // if (typeof findObj === "undefined") {
    //   alert("Tienes que seleccionar por lo menos una unidad...");
    // }
  };

  const validateColumnChecked = () => {
    const findObj = selectMenu.columnas.find((item) => item.estado === true);
    return typeof findObj === "undefined";
    // if (typeof findObj === "undefined") {
    //   alert("Tienes que seleccionar por lo menos una columna exportar...");
    // }
  };

  /* obtener listado de vehiculos desde BACK */
  const getReportJson = (select_menu, form_data) => {
    // -- https://orbitecsac.com/devices-lite?limit=100&offset=0&search&ordering=-created&users__username=guapolindo
    const report_id = select_menu.id;
    const report_name = select_menu.descripcion;
    const placas = [];
    form_data.vehicles.map((item) => placas.push(`"${item.plate}"`));

    const column_hidden = [];
    form_data.columns.map((item) => {
      item.estado && column_hidden.push(`"${item.nombre}"`);
    });

    // const date_interval = getDateInterval(); // -- ya no se utiliza, BACK genera el rango de fechas segun periodo

    const options = {
      headers: {
        Authorization: `token ${getLoginToken()}`,
      },
      params: {
        pk_user: getUserData().id,
        placas: `[${placas.join(",")}]`,
        columnas: `[${column_hidden.join(",")}]`,
        // start_date: `${date_interval.ds} ${reportData.selectStartHour}:00`,
        // end_date: `${date_interval.de} ${reportData.selectEndHour}:00`,
        start_date: `${reportData.selectStartDate}`,
        end_date: `${reportData.selectEndDate}`,
        format: "json",
        // geozonas => []
        // status => []
        options: form_data.params?.options,
        // --
        period: reportData.selectPeriod,
        start_hour: `${reportData.selectStartHour}:00`,
        end_hour: `${reportData.selectEndHour}:00`,
      },
    };
    setisLoading(true);

    // -- realizar peticion y obtener JSON (se creara tabla con estos datos)
    axios
      .get(`${baseUrlReports()}/${report_id}`, options)
      .then((res) => {
        // console.log("getReportJson => res.data", res.data);
        setisLoading(false);
        replaceContent(
          <ReportDataTable res={res.data} report_id={report_id} report_name={report_name} options={options} />
        );
      })
      .catch(function (error) {
        // console.log("Show error notification!");
        replaceContent(<ReportDataTable res={[]} report_id={report_id} report_name={report_name} options={[]} />);
      });
  };

  /* funcion para generar datos del reporte (back entrega JSON) */
  const generateReportData = () => {
    // console.log("paramsOptions", paramsOptions);
    if (validateVehiclesChecked()) {
      /* validate minimun vehicle checked */
      alert("Tienes que seleccionar por lo menos una unidad...");
    } else if (validateColumnChecked()) {
      /* validate minimun column checked */
      alert("Tienes que seleccionar por lo menos una columna exportar...");
    } else {
      /* Colectar datos para posterior ENVIO */
      const vehicleListFilter = vehicleList.filter((item) => item.value === true);
      const columnListFilter = selectMenu.columnas.map((item) => ({ ...item, estado: !item.estado }));
      const formData = { vehicles: vehicleListFilter, columns: columnListFilter, params: paramsOptions, reportData };
      // console.log("formData", formData);
      getReportJson(selectMenu, formData);
    }
  };

  /* Instrucciones al cargar/renderizar componente */
  useEffect(() => {
    // console.log("useEffect => ReportProvider");

    // -- obtener listado de vehiculos desde BACK
    getVehicles();

    // -- obtener listado de geozonas (del usuario) desde BACK
    getGeozones();
  }, []);

  return (
    <ReportContext.Provider
      value={{
        isLoading,
        vehicleList,
        handleCheckPlate,
        reportData,
        updateReportData,
        clearReportData,
        tabIndex,
        setTabIndex,
        generateReportData,
        geozoneList,
        paramsOptions,
        setParamsOptions,
        showDatePicker,
        setShowDatePicker,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export default ReportProvider;
