
import React from 'react'
import {Route,Routes } from 'react-router-dom'
import MenuLista from '../components/Menu/MenuLista'
import Error404 from '../error/Error404'
import GenerarReporte from '../pages/GenerarReporte'
import Login from '../pages/login/Login'
import NewReports from '../pages/NewReports'
import ReportLayout from '../pages/ReportLayout'
import ReportColums from '../pages/ReportsColums'
import Welcom from '../pages/Welcom'
import Root from './Root'

const RouterApp = () => {
  return (
   <Routes>
    <Route path="*" element={<h1>No encontrado... (404)</h1>}></Route>
    <Route path="/" element={<Root />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path='/new-reports' element={<MenuLista/>}></Route>
    <Route path='/Welcome' element={<Welcom/>}></Route>
    <Route path='/ReportsColums' element={<ReportColums/>}></Route>
    <Route path='/new-reports/NewReports' element={<NewReports/>}></Route>
    <Route path='/new-reports/ReportLayout' element={<ReportLayout/>}></Route>
    
    <Route path='Error404' element={<Error404/>} ></Route>
   </Routes>
  )
}

export default RouterApp