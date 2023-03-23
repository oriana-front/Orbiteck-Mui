import { BarChart, HomeOutlined, SaveOutlined } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Icon } from '@mui/material';
import {  grey } from '@mui/material/colors';
import React from 'react'

function MenuCategoria({ saveIcon = false, homeIcon = false, children }) {
  const newIcon = saveIcon ? SaveOutlined : BarChart;

  return (
   <>
   <Icon   sx={{ mr: open ? 3 : 'auto',minWidth: 0, color:grey[600] , marginRight:1,justifyContent: 'center'}} as={ homeIcon ? HomeOutlined : newIcon}/>
   <Box as="span"  textAlign="left" fontSize="sm" w="full" >
     {children} 
   </Box >
   {!saveIcon ? <AccordionActions/> : null}
   
   </>
   
  )
}

export default MenuCategoria