import { useContext, useState, useEffect} from 'react'
import { ScannerContext } from '../scannerContext/ScannerContext'
import ResultScanner from './ResultScanner'

function ResultItem() {
    const { articulo } = useContext(ScannerContext)

    useEffect(()=>{
        setSaveArticulo(filterResult)
    },[])

    return (
    <>
        {
            articulo.map( (art) => (
                <ResultScanner articulo={art.articulo} precio={art.precio}/>
        ))
        }
    </>
  )
}

export default ResultItem