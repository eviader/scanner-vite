import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ScannerContextProvider} from './components/scannerContext/ScannerContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScannerContextProvider>
        <App />  
    </ScannerContextProvider>
  </React.StrictMode>,
)
