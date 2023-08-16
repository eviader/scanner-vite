import './ResultScanner.css'
import {useContext, useEffect} from 'react'
import { ScannerContext } from '../scannerContext/ScannerContext'

function ResultScanner() {
  const { filterArticul } = useContext(ScannerContext)

  return (
    <>
      <div className='section-articul'>
        { 
        filterArticul.map( art =>( 
            <>
              <div className='container-articule'>
                <h2 className='articule'>{art.articulo}</h2>
              </div>
              <div className='container-price'>
                <h1 className='price'>${art.precio}</h1>
              </div>
            </>
          ))
        }
      </div>  
    </>
  )
}

export default ResultScanner