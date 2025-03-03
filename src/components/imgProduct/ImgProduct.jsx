import './ImgProduct.css';
import { useContext, useEffect, useState } from 'react';
import { ScannerContext } from '../scannerContext/ScannerContext';

function ImgProduct() {
  const { filterArticul } = useContext(ScannerContext)
  const [ uniqueProduct, setUniqueProduct ] = useState([])

  useEffect(() => {
    const newProduct = filterArticul.map(art => {
      if(art.articulo.substring(0,1) == "L"){
        const color = art.articulo.substring(8, 11)
        const code = art.articulo.substring(0, 5)
        return {id : color, code: code, color: color}
      }
      const color = art.articulo.substring(8, 11)
      const code = art.articulo.substring(0, 6)
        
      return {id : color, code: code, color: color}
      })

    const deleteRepitproduct = [...new Map(newProduct.map(item => [item.id, item])).values()];
    setUniqueProduct(deleteRepitproduct)
  
  }, [filterArticul])

  return (
    <>
      
      <section className='main-conteiner-img'>
      {uniqueProduct.map(art => (
        <div className="container-img" key={art.id}>
          <img src={`https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw54416a1e/${art.code}_${art.color}_24.jpg?imwidth=53&impolicy=pctp`} />
          <p className='code-art'>{art.color}</p>
        </div>
      ))}
      </section>
      
      
    </>
  );
}

export default ImgProduct;


      