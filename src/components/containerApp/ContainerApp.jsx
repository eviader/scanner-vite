import './ContainerApp.css'
import ResultScanner from '../resultScanner/ResultScanner';
import FilterScanner from '../filterScanner/FilterScanner';
import CamaraScanner from '../camaraScanner/CamaraScanner';
import ImgProduct from '../imgProduct/ImgProduct';
import LoadingPage from '../loadingPage/LoadingPage';
import imgLacoste from '../../assets/img/lacoste.png';
import { IconBarcode } from '@tabler/icons-react';
import { useState, useEffect } from 'react'


function ContainerApp() {
const [initButton, setInitButton] = useState(false)
const [initPage, setInitPage] = useState(true)


const handleCam = (cam) => {
  setInitButton(cam)
  console.log(cam)
}

useEffect(() => {
  setTimeout(() => {
    setInitPage(false)
  }, 1000);
},[])

  return (
    <>
 {  initPage ? 
    <section className='loading'> <LoadingPage /></section> :
    <main className='main-container'>
      <div className='backgraunde-lacoste-container'>
      <img className='backgraunde-lacoste' src={imgLacoste} alt="lacoste" />
      </div>
      <nav className='container-header'>
          <FilterScanner activeCamByFilter= {handleCam}/>
      </nav> 
      <section className='container-result'>
          <ResultScanner />
      </section>
      <section className='img-product'>
        <ImgProduct />
      </section>
      <section className='container-record'>
        {initButton ? <CamaraScanner handleCam={handleCam}/> : <button className='activeCam' onClick={() => {handleCam(true)}}><IconBarcode  size={40} color='#00542c'/></button>}
      </section>
    </main> }

    <section className='max-resposive'>
      <p>Intentalo en tu movil</p>
    </section>
  </>

  )
}

export default ContainerApp