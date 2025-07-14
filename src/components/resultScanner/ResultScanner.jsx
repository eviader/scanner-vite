import './ResultScanner.css'
import {useContext} from 'react'
import { ScannerContext } from '../scannerContext/ScannerContext'

function ResultScanner() {
  const { filterArticul } = useContext(ScannerContext)

  return (
    <>
      <section className='section-articul'>
      <p className='title-columns'>Codigo</p>
      <p className='title-columns'>Precio</p>
      <p className='title-columns'>Stock</p>
        {
          
          filterArticul.map( art => (  
              <>
                <div className='container-articule'>
                  <p className='articule'>{art.articulo}</p>
                </div>
                <div className='container-price'>
                  <p className='price'>${art.precio}</p>
                </div>
                <div className='container-stock'>
                  <p className='stock'>{art.stock + "uni"}</p>
                </div>
              </>
            ))
          } 
        </section>  
   
    </>
  )
}

export default ResultScanner