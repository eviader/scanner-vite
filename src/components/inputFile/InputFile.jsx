import './InputFile.css'
import { useContext } from 'react'
import readXlsxFile from 'read-excel-file'
import { ScannerContext } from '../scannerContext/ScannerContext'
import  Navigation  from '../navigation/Navigation'

function InputFile() {
    const { getFiles } = useContext(ScannerContext)

    const handleInput = async (e) => {
        const excelData = await readXlsxFile(e.files[0])
        getFiles(excelData)
    }

    return (
    <>
        <Navigation />
        <input className='input-file'  onChange={(e) => handleInput(e.target)} type="file" name="excel-file" />
    </>
  )
}

export default InputFile
