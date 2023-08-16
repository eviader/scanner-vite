import './ContainerApp.css'
import { useState, useContext } from 'react';
import { IconCamera } from '@tabler/icons-react';
import ResultScanner from '../resultScanner/ResultScanner';
import FilterScanner from '../filterScanner/FilterScanner';
import Navigation from '../navigation/Navigation';
import CamaraScanner from '../camaraScanner/CamaraScanner';
import { ScannerContext } from '../scannerContext/ScannerContext';
import { useEffect, useMemo, useRef } from 'react';


function ContainerApp() {
  const { activeButtton } = useContext(ScannerContext)
  const [initButton, setInitButton] = useState(true)


  useEffect(() =>{
    initButton
    setInitButton(activeButtton)
  },[])

  const handleCam = () => {
    setInitButton(true)
  }
  

  return (
    <main className='main-container'>
        <div className='container-header'>
            <Navigation />
        </div> 
        <section className='container-result'>
            <ResultScanner />
        </section>
        <section className='container-input'>
            <FilterScanner />
        </section>
        <section className='container-record'>
          {initButton ? <CamaraScanner /> : <button className='activeCam' onClick={() => {handleCam(true)}}><IconCamera  size={50} color='white'/></button>}  
        </section>
    </main>
  )
}

export default ContainerApp