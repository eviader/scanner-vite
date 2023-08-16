import './App.css'
import ContainerApp  from './components/containerApp/ContainerApp'
import InputFile from "./components/inputFile/InputFile";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ContainerApp />} />
          <Route path='/carga' element={<InputFile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
