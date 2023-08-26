import './CamaraScanner.css'
import Quagga  from "quagga"
import styled from 'styled-components'
import config from './config.json'
import { IconTags, IconCamera, IconCameraRotate   } from '@tabler/icons-react';
import { useEffect, useContext, useState, useMemo } from "react"
import { ScannerContext } from '../scannerContext/ScannerContext'

function CamaraScanner() {
  const [camR, setCamR] = useState(false)
  const { filterScannerContext } = useContext(ScannerContext)


  const handleRotateCam = () => {
    if(camR == false){
      setCamR(true)
    }else{
      setCamR(false) 
    }
  }

  useEffect(() => {

    // Configuración de Quagga (pueden variar según la documentación de la librería)
    const config = {
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: 380,
          height: 380,
          facingMode: camR ? "user" : "environment", // Puedes cambiarlo según la cámara que desees utilizar

        },
        area: { // defines rectangle of the detection/localization area
          top: "0%",    // top offset
          right: "0%",  // right offset
          left: "0%",   // left offset
          bottom: "0%"  // bottom offset
        },
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      numOfWorkers: navigator.hardwareConcurrency,
      decoder: {
        readers: ['ean_reader', 'upc_reader'],
      },
      locate: false,
      frecuency: 2,

    };

    // Inicializar Quagga
    Quagga.init(config, (err) => {
      if (err) {
        console.error('Error al inicializar Quagga:', err);
        return;
      }
      Quagga.start();
    });

    // Escuchar eventos de Quagga
    Quagga.onDetected((data) => {
      if(data){
        const dataCode = data.codeResult.code
        filterScannerContext(dataCode)
      }
    });

    // Limpiar Quagga al desmontar el componente

  }, [camR]);

  return (
    <>
      <button className='rotate-cam' onClick={handleRotateCam}><IconCameraRotate color='white'/></button>
      <div id="interactive" className="viewport" />
    </>
  );
};

export default CamaraScanner