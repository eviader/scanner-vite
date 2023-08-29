import './InputFile.css'
import { useContext } from 'react'
import readXlsxFile from 'read-excel-file'
import { ScannerContext } from '../scannerContext/ScannerContext'
import  Navigation  from '../navigation/Navigation'

function InputFile() {
    const { getFiles } = useContext(ScannerContext)

    const handleInput = async (e) => {
        const excelData = await readXlsxFile(e.files[0])
        console.log(excelData)
        //getFiles(excelData)
    }

    return (
    <>
        <Navigation />
        <input type="file" onChange={(e) => handleInput(e.target)} name="xls" id="file-xls" />
    </>
  )
}

export default InputFile
