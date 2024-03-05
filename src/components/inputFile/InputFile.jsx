import './InputFile.css'
import { useContext, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import { ScannerContext } from '../scannerContext/ScannerContext'
import  Navigation  from '../navigation/Navigation'

function InputFile() {
    const { getFiles, loadingUpdate, loadingcComplete } = useContext(ScannerContext)
    
  

    const handleInput = async (e) => {
        const excelData = await readXlsxFile(e.files[0])
        getFiles(excelData)
        
    }

    return (
    <>
        <nav className='nav-bar'>
            <Navigation />
        </nav>
        <section className='section-navigation'>
            <input type="file" onChange={(e) => handleInput(e.target)} name="xls" id="file-xls" />
        </section>
        <div>
            {
                loadingUpdate ? <p>cargando</p> : <p></p>              
            }
        </div>
        <div>
            {
                loadingcComplete ? <p>Carga completa</p> : <p></p>              
            }
        </div>
    </>
  )
}

export default InputFile
