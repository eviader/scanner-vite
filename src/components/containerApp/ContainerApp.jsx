import './ContainerApp.css'
import ResultScanner from '../resultScanner/ResultScanner';
import FilterScanner from '../filterScanner/FilterScanner';
import Navigation from '../navigation/Navigation';
import CamaraScanner from '../camaraScanner/CamaraScanner';
import { IconCamera } from '@tabler/icons-react';
import { useState} from 'react'

function ContainerApp() {
const [initButton, setInitButton] = useState(false)

const handleCam = (cam) => {
  setInitButton(cam)
}

  return (
    <main className='main-container'>
        <nav className='container-header'>
            <Navigation />
        </nav> 
        <section className='container-result'>
            <ResultScanner />
        </section>
        <section className='container-input'>
            <FilterScanner />
        </section>
        <section className='container-record'>
          {initButton ? <CamaraScanner handleCam={handleCam}/> : <button className='activeCam' onClick={() => {handleCam(true)}}><IconCamera  size={50} color='white'/></button>}
        </section>
    </main>
  )
}

export default ContainerApp