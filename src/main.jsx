import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ScannerContextProvider} from './components/scannerContext/ScannerContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScannerContextProvider>
        <App />  
    </ScannerContextProvider>
  </StrictMode>,
)