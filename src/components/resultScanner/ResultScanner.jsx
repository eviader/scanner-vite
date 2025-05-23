import './ResultScanner.css'
import {useContext, useEffect} from 'react'
import { ScannerContext } from '../scannerContext/ScannerContext'

function ResultScanner() {
  const { filterArticul } = useContext(ScannerContext)

  return (
    <>
      <div className='section-articul'>
      <p>Codigo</p>
      <p>Precio</p>
      <p>Stock</p>
        { 
        filterArticul.map( art =>( 
            <>
              <div className='container-articule'>
                <p className='articule'>{art.articulo}</p>
              </div>
              <div className='container-price'>
                <p className='price'>${art.precio}</p>
              </div>
              <div className='container-stock'>
                <p className='stock'>{art.stock}</p>
              </div>
            </>
          ))
        }
      </div>  
    </>
  )
}

export default ResultScanner