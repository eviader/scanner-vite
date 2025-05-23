import './ContainerApp.css'
import ResultScanner from '../resultScanner/ResultScanner';
import FilterScanner from '../filterScanner/FilterScanner';
import Navigation from '../navigation/Navigation';
import CamaraScanner from '../camaraScanner/CamaraScanner';
import ImgProduct from '../imgProduct/ImgProduct';
import LoadingPage from '../loadingPage/LoadingPage';
import { ScannerContext } from '../scannerContext/ScannerContext'
import { IconCamera } from '@tabler/icons-react';
import { useState, useContext, useEffect } from 'react'


function ContainerApp() {
const [initButton, setInitButton] = useState(false)
const [initPage, setInitPage] = useState(true)
const { articul } = useContext(ScannerContext)

const handleCam = (cam) => {
  setInitButton(cam)
}

useEffect(() => {
  if(articul.length != 0){
    setInitPage(false)
  }
},[articul])

  return (
    <>
 {  initPage ? 
    <section className='loading'> <LoadingPage /></section> :
    <main className='main-container'>
      <nav className='container-header'>
          <FilterScanner />
      </nav> 
      <section className='container-result'>
          <ResultScanner />
      </section>
      <section className='img-product'>
        <ImgProduct />
      </section>
      <section className='container-record'>
        {initButton ? <CamaraScanner handleCam={handleCam}/> : <button className='activeCam' onClick={() => {handleCam(true)}}><IconCamera  size={30} color='white'/></button>}
      </section>
    </main> }
    <section className='max-resposive'>
      <p>en dispositivo movil</p>
    </section>
  </>

  )
}

export default ContainerApp