import './ImgProduct.css';
import '../../../public/error-img2.png' 
import { useContext, useEffect, useState } from 'react';
import { ScannerContext } from '../scannerContext/ScannerContext';
import { ClipLoader } from "react-spinners";

function ImgProduct() {
  const ERROR_IMG = '../../../public/error-img2.png'
  const { filterArticul } = useContext(ScannerContext)
  const [uniqueProduct, setUniqueProduct] = useState([]) //filtramos un solo articulo por color
  const [loadingImgs, setLoadingImgs] = useState({}); //manejamos el estado de carga de cada uno de las imagenes


  useEffect(() => {

    /*en estas condicionaeles controlamos que tipo de articulo filtramos*/
    const newProduct = filterArticul.map(art => {
      if (art.articulo.substring(0, 1) === "L") {
        const color = art.articulo.substring(8, 11)
        const code = art.articulo.substring(0, 5)
        return { id: color, code: code, color: color, webcode: "24" }
      }

      /* N para los marroquineria */
      if (art.articulo.substring(0, 1) === "N") {
        const color = art.articulo.substring(8, 11)
        const code = art.articulo.substring(0, 8)
        return { id: color, code: code, color: color, webcode: "24" }
      }

      /* 7 para los cazlado */
      if (art.articulo.substring(0, 1) === "7") {
        const color = art.articulo.substring(10, 13)
        const code = art.articulo.substring(1, 10)
        console.log(code, color)
        return { id: color, code: code, color: color, webcode: "01" }
      }
      
      if (art.articulo.substring(0, 1) === "S") {
        const color = "RESULTADOS"
        const code = "SIN"
        return { id: color, code: code, color: color, webcode: "01" }
      }

      //en esta lista entran todos los subcodigos sin condicion
      const color = art.articulo.substring(8, 11)
      const code = art.articulo.substring(0, 6)

      return { id: color, code: code, color: color, webcode: "24" }
    })

    //tomamos la lista de articulos y solo agarramos uno de cada modelo/color
    const deleteRepitproduct = [...new Map(newProduct.map(item => [item.id, item])).values()];
    setUniqueProduct(deleteRepitproduct)

  }, [filterArticul])

  const handleImageLoad = (id) => {
    setLoadingImgs(prev => ({ ...prev, [id]: false }));
  };
  
  const handleImageError = (e, id) => {
    e.target.src = ERROR_IMG;
    e.target.alt = 'sin-imagen';
    e.target.className = "img-error";
    setLoadingImgs(prev => ({ ...prev, [id]: false }));
  };

  return (
    <>
      <section className='main-conteiner-img'>
        {uniqueProduct.map(art => (
          <div className="container-img" key={art.id}>
            {loadingImgs[art.id] !== false && <ClipLoader color='green' size={35}/>}

            <img
              className='img-product'
              src={`https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw913e769b/${art.code}_${art.color}_${art.webcode}.jpg?imwidth=38&impolicy=zoom`}
              alt='img-product'
              onLoad={() => handleImageLoad(art.id)}
              onError={(e) => handleImageError(e, art.id)}
              style={{
                display: loadingImgs[art.id] !== false ? 'none' : 'block',
              }}
            />
            <p className='code-art' style={{
              display: loadingImgs[art.id] !== false ? 'none' : 'block',
            }}
            >{art.code + " " + art.color}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default ImgProduct;


