import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
import { Accordion,AccordionActions,AccordionDetails,AccordionSummary, Avatar, BottomNavigation, BottomNavigationAction, ListItemIcon, MenuItem } from '@mui/material';
import MenuCategoria from './MenuCategoria';
import { useAppContext } from '../../content/Provider';
import Welcome from '../../pages/Welcom';
import { useNavigate } from 'react-router-dom';
import NewReports from '../../pages/NewReports';
import { ExpandMoreOutlined, List, ListAlt, RestoreOutlined } from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';


const drawerWidth = 380;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export  const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MenuLista() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { menuList, selectMenu, setSelectMenu, replaceContent } = useAppContext(); 
  const [content,setContent]=useState("Welcome");
  
  const navigate=useNavigate();
  const removeContent=()=>{
    setContent(()=>content);
  }

  const handleSelectedMenu = (menuItem) => {
    setSelectMenu(menuItem);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log(menuList)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="error"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Avatar size={"sm"} src={"https://app.orbitec.pe/img/logo.99c902d5.svg"} mr="2" />
          <Typography marginLeft={1} variant="h6" noWrap component="div">
            ORBITEC
          </Typography>

          
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div disablePadding sx={{ display: 'block' }}>

        {/* Botón Inicio*/}
        {["Inicio"].map((text, index)=>(
         <Accordion  disableGutters >
          <AccordionSummary  type='IconButton' disabled={false} 
              onClick={()=>setContent("Welcome")}  
        >
              <MenuCategoria  saveIcon={true} homeIcon={true} />  
             <ListItemText secondary={text}  sx={{ opacity: open ? 1 : 0,marginLeft:2}}></ListItemText>
               </AccordionSummary>
         </Accordion>))}

          {/* Botón guardar reportes*/}
         <Accordion disableGutters >
              {["Reportes guardados"].map((text)=>(
                  <AccordionSummary ype='IconButton' disabled={false} 
                  onClick={()=>setContent("NewReports")}
                 >
              <MenuCategoria saveIcon={true} homeIcon={false}  />  
             <ListItemText  secondary={text} sx={{ opacity: open ? 1 : 0,marginLeft:2 }}></ListItemText>
               </AccordionSummary>
              ))}
         </Accordion>

         {/*Consumir lista de menu*/}
         {menuList.map((menu_category, index) => (
         <Accordion key={index} disableGutters>
              {[menu_category.descripcion].map((text)=>(
                  <AccordionSummary   expandIcon={<ExpandMoreOutlined/>}>
              <MenuCategoria></MenuCategoria>  
             <ListItemText secondary={text} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
               </AccordionSummary>
              ))}
               {/* consumir listado de reportes*/}
              
              <AccordionDetails>
                 {menu_category.reportes.map((menu_item,index)=>{
                let newProps = {};
                if(menu_item.id==selectMenu.id){
                  newProps = {
                    backgroundColor: "red.400",
                    color: "white",
                  };
                }
                  return (
                    <BottomNavigation  sx={{ pl:1 }} key={index}
                    onClick={(e)=>{
                      e.preventDefault();
                    replaceContent(<NewReports/>)
                    }}
                    {...newProps}>
                      <ListItemIcon><List/></ListItemIcon>
                      <ListItemText secondary={menu_item.descripcion} sx={{ opacity: open ? 1 : 0 }} ></ListItemText>
                    </BottomNavigation>
                  )})}
                  
              </AccordionDetails>
         </Accordion>))}
       </div>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {content== "Welcome" && <Welcome/>} 
          {content== "NewReports" && <NewReports/>}
      </Box>
     
      
    </Box>
  );
}