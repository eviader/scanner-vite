import './ContainerApp.css'
import { IconTags } from '@tabler/icons-react';
import ResultScanner from '../resultScanner/ResultScanner';
import FilterScanner from '../filterScanner/FilterScanner';
import InputFile from '../InputFile/InputFile';

function ContainerApp() {
  return (
    <main className='main-container'>
        <div className='container-header'>
            <div>
                <h2 className='title'>Precios <IconTags size={30} /></h2>
            </div>
            <div>
                <InputFile />
            </div>
                
        </div> 
        <section className='container-result'>
            <ResultScanner />
        </section>
        <section className='container-input'>
            <FilterScanner />
        </section>
        <section className='container-record'>

        </section>
    </main>
  )
}

export default ContainerApp