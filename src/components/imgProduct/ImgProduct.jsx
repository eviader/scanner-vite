import './ImgProduct.css';
import '../../../public/error-img2.png'
import { useContext, useEffect, useState } from 'react';
import { ScannerContext } from '../scannerContext/ScannerContext';

function ImgProduct() {
  const ERROR_IMG = '../../../public/error-img2.png'
  const { filterArticul } = useContext(ScannerContext)
  const [ uniqueProduct, setUniqueProduct ] = useState([])

  useEffect(() => {
    /*en estas condicionaeles controlamos que tipo de articulo filtramos*/
    const newProduct = filterArticul.map(art => {
      if(art.articulo.substring(0,1) === "L"){
        const color = art.articulo.substring(8, 11)
        const code = art.articulo.substring(0, 5)
        return {id : color, code: code, color: color, webcode: "24"}
      }

      /* N para los marroquineria */
      if(art.articulo.substring(0,1) === "N"){
        const color = art.articulo.substring(8, 11)
        const code = art.articulo.substring(0, 8)
        return {id : color, code: code, color: color, webcode: "24"}
      }
      
      /* 7 para los cazlado */
      if(art.articulo.substring(0,1) === "7"){
        const color = art.articulo.substring(10, 13)
        const code = art.articulo.substring(1, 10)
        console.log(code, color)
        return {id : color, code: code, color: color, webcode: "01"}
      }

      const color = art.articulo.substring(8, 11)
      const code = art.articulo.substring(0, 6)
        
      return {id : color, code: code, color: color, webcode: "24"}
      })

    const deleteRepitproduct = [...new Map(newProduct.map(item => [item.id, item])).values()];
    setUniqueProduct(deleteRepitproduct)
  
  }, [filterArticul])

  const ErrorImagen = (e) => {
    e.target.src = ERROR_IMG // Imagen de respaldo
    e.target.alt = 'Imagen no encontrada' // Texto alternativo
    e.target.className = "img-error"
  }

  return (
    <>
      
      <section className='main-conteiner-img'>
      {uniqueProduct.map(art => (
        <div className="container-img" key={art.id}>
          {<img src={`https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw54416a1e/${art.code}_${art.color}_${art.webcode}.jpg?imwidth=53&impolicy=pctp`}
            alt='img-product'
            onError={ErrorImagen} />}
          <p className='code-art'>{art.code +" "+ art.color}</p>
        </div>
      ))}
      </section>
      
      
    </>
  );
}

export default ImgProduct;


      