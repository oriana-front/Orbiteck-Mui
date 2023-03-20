
import React from 'react'
import {Route,Routes } from 'react-router-dom'
import MenuList from '../components/Menu/MenuList'
import Error404 from '../error/Error404'
import Login from '../pages/login/Login'



import Root from './Root'

const RouterApp = () => {
  return (
   <Routes>
    <Route path="/"element={<Root/>}>
    <Route index element={<Login/>} ></Route>
    <Route path='Menu' element={<MenuList/>}></Route>
    </Route>
    <Route path='Error404' element={<Error404/>} ></Route>
   </Routes>
  )
}

export default RouterApp