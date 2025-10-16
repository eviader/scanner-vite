import './ResultScanner.css'
import { useContext, useState } from 'react'
import { ScannerContext } from '../scannerContext/ScannerContext'
import { BarLoader } from "react-spinners";

function ResultScanner() {
  const { filterArticul, waitArticulContext } = useContext(ScannerContext)


  return (
    <>
      <section className='section-articul'>
      <p className='title-articule' style={{borderRadius: '6px 0px 0px 6px'}}>Codigo</p>
      <p className='title-price'>Precio</p>
      <p className='title-stock' style={{borderRadius: '0 6px 6px 0'}}>Stock</p>
      

        { 
          filterArticul.map( art => (  
              <>
                <div className='container-articule'>
                  <p className='articule'>{art.articulo}</p>
                </div>
                <div className='container-price' >
                  <p className='price'>${art.precio}</p>
                </div>
                <div className='container-stock' >
                  <p className='stock'>{art.stock + "Uni"}</p>
                </div>
              </>
            ))
          } 
          {
            waitArticulContext &&
            <span className='bar-loader'> 
              <BarLoader width='1000' color='#4D5246'/>
            </span>
          }

        </section>  
   
    </>
  )
}

export default ResultScanner