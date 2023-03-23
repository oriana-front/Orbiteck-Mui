
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Provider from './content/Provider'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
      <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>
  
)
