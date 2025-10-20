import './FilterScanner.css'
import { IconBarcode, IconSearch, IconBackspace } from '@tabler/icons-react';
import { ScannerContext } from '../scannerContext/ScannerContext';

import {useState, useContext} from 'react'

function FilterScanner({activeCamByFilter}) {
  const { buscarArticulosPorPrefijo, cleanListArticuls } = useContext(ScannerContext)
  const [filterArticul, setFilterArticul] = useState("")

  const handleFilter = (e) =>{
    setFilterArticul(e)
  }

  const ActiveCam = () => {
    activeCamByFilter(true)
  }

  const clearInput = () => {
    setFilterArticul("")
  }
  
  
  return (
    <>  
        <div className='filter'>
            <input className='filter-input' value={filterArticul} onChange={(e) => handleFilter(e.target.value)} type="text" placeholder='Introduce el código' />
            <button className='button-clear' onClick={() => {cleanListArticuls(), clearInput()}}><IconBackspace size={28} stroke={2} /></button>
            <button className='button-filter' onClick={() => {buscarArticulosPorPrefijo(filterArticul)}}><IconSearch /></button>
            <button className='button-active-cam-by-filter' onClick={() => {ActiveCam()}}><IconBarcode size={28}/></button>
        </div>
        
    </>
  )
}

export default FilterScanner
