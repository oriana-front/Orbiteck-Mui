
import React, { createContext } from 'react'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios';
import { baseUrlReports } from '../helpers/config'
import Welcome from '../pages/Welcom'


export const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

function Provider({ children }) {
  const [content, setContent] = useState(<Welcome/>);
  const [menuList, setMenuList] = useState([]);
  const [selectMenu,setSelectMenu]=useState({});
  const replaceContent = (content) => {
    setContent(() => content);
  };

 /* listado de los check de las columnas*/
 const handleCheckColumn = (updateSelectMenu) => {
  setSelectMenu({ ...selectMenu, columnas: updateSelectMenu });
  };

  const getMenu = () => {
    axios.get(`${baseUrlReports()}/reports_schema`).then((res) => {
      setMenuList(res.data);
      
    });
  };
  
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <AppContext.Provider value={{ menuList, selectMenu, setSelectMenu, handleCheckColumn, content, replaceContent }}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;
