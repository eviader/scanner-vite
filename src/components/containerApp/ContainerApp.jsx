import './ContainerApp.css'
import { IconTags } from '@tabler/icons-react';
import ResultScanner from '../resultScanner/ResultScanner';
import FilterScanner from '../filterScanner/FilterScanner';
import InputFile from '../InputFile/InputFile';
import CamaraScanner from '../camaraScanner/CamaraScanner';
import { useState, useContext } from 'react';
import { ScannerContext } from '../scannerContext/ScannerContext';

function ContainerApp() {
  const {  filterAlternativeContext } = useContext(ScannerContext)
  const [scanCode, setScanCode] = useState('');
  const [modal, setModal] = useState(false);

  const _toggle = () => {
    setModal(!modal);
  };

  const _onDetected = (result) => {
    setScanCode(result ? result.codeResult.code : '');
    filterAlternativeContext(scanCode)
  };

  return (
    <main className='main-container'>
        <div className='container-header'>
           <a href="http://">Busqueda</a>
           <a href="http://">Carga</a> 
        </div> 
        <section className='container-result'>
            <ResultScanner />
        </section>
        <section className='container-input'>
            <FilterScanner />
        </section>
        <section className='container-record'>
            <CamaraScanner handleScan={_onDetected}/>
        </section>
    </main>
  )
}

export default ContainerApp