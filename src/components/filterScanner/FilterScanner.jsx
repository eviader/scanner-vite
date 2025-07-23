import './FilterScanner.css'
import { IconSearch } from '@tabler/icons-react';
import { ScannerContext } from '../scannerContext/ScannerContext';
import {useState, useContext} from 'react'

function FilterScanner() {
  const { buscarArticulosPorPrefijo } = useContext(ScannerContext)
  const [filterArticul, setFilterArticul] = useState("")

  const handleFilter = (e) =>{
    setFilterArticul(e)
  }

  return (
    <>  
        <div className='filter'>
            <input className='filter-input' value={filterArticul} onChange={(e) => handleFilter(e.target.value)} type="text" placeholder='Codigo' />
            <button className='button-filter' onClick={() => {buscarArticulosPorPrefijo(filterArticul)}}><IconSearch /></button>
        </div>
        
    </>
  )
}

export default FilterScanner
