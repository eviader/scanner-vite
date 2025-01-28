import './ImgProduct.css'
import {useContext, useEffect} from 'react'
import { ScannerContext } from '../scannerContext/ScannerContext'


function ImgProduct() {
    const { filterArticul } = useContext(ScannerContext)
    
    //filterArticul.map( art =>( 
      //(art.articulo.substring(8, 11))
      //(art.articulo.substring(1, 6))
    //))

    const color = filterArticul.map( art =>( 
      (art.articulo.substring(8, 11))

    ))
    const code =     filterArticul.map( art =>( 
      (art.articulo.substring(0, 6))
    ))
    
    console.log(code + color)

  return (
   <>

   {
    filterArticul.map(art => (
      <>
        <div>
          <img src={`https://image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/fr/dwd4a133ad/${code}_${color}_24.jpg?imwidth=67&impolicy=pctp`} alt="product-img" />
        </div>
      </>
    ))
   }
    
   </>
  )
}

export default ImgProduct


      