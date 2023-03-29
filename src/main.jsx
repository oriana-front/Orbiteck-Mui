

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Provider from './content/Provider'
import ReportProvider from './content/ReportProvider'



ReactDOM.createRoot(document.getElementById('root')).render(

 <Provider>
      <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider> 


   
  
  
)
