
import React from 'react'
import {Route,Routes } from 'react-router-dom'
import MenuLista from '../components/Menu/MenuLista'

import Error404 from '../error/Error404'
import Login from '../pages/login/Login'
import NewReports from '../pages/NewReports'
import Welcom from '../pages/Welcom'



import Root from './Root'

const RouterApp = () => {
  return (
   <Routes>
    <Route path="/"element={<Root/>}>
    <Route index element={<Login/>} ></Route>
    <Route path='Menu' element={<MenuLista/>}></Route>
    <Route path='Bienvenidos' element={<Welcom/>}></Route>
    <Route path='/Menu/NewReports' element={<NewReports/>}></Route>
    </Route>
    <Route path='Error404' element={<Error404/>} ></Route>
   </Routes>
  )
}

export default RouterApp