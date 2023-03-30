import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import MenuLista from "../components/Menu/MenuLista";
import Error404 from "../error/Error404";
import Login from "../pages/login/Login";
import GenerarReporte from "../pages/Reports/GenerarReporte";
import NewReports from "../pages/Reports/NewReports";
import ReportLayout from "../pages/Reports/ReportLayout";
import Reports from "../pages/Reports/Reports";
import Welcom from "../pages/Welcom";
import LoginAs from "./loginas";
import Root from "./Root";

const RouterApp = () => {
  return (
    <Routes>
      <Route path="*" element={<h1>No encontrado... (404)</h1>}></Route>
      <Route path="/" element={<Root />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/loginas/:token" element={<LoginAs />}></Route>
      <Route path="/new-reports" element={<Reports />}></Route>
      {/* <Route path="/Welcome" element={<Welcom />}></Route>
      <Route path="/GenerarReporte" element={<GenerarReporte/>}></Route>
      <Route path="/new-reports/NewReports" element={<NewReports/>}></Route>
      <Route path="/new-reports/ReportLayout" element={<ReportLayout/>} ></Route>
      <Route path="Error404" element={<Error404 />}></Route> */}
    </Routes>
  );
};

export default RouterApp;
