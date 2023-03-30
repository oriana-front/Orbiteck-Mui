import { BarChart, House, Save} from '@mui/icons-material'
import { AccordionActions, Box, Icon } from '@mui/material';
import {  grey } from '@mui/material/colors';
import React from 'react'


function MenuCategoria({ saveIcon = false, homeIcon = false, children }) {
  const newIcon = saveIcon ? Save: BarChart;

  return (
   <>
   <Icon  sx={{ color:grey[600],fontSize:20}} as={ homeIcon ? House : newIcon} />
   <Box  fontSize="sm"  >
     {children} 
   </Box >
   {!saveIcon ? <AccordionActions/> : null}
   
   </>
   
  )
}

export default MenuCategoria