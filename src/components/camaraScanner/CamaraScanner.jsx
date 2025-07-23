import './CamaraScanner.css'
import Quagga  from "quagga"
import { IconCameraRotate } from '@tabler/icons-react';
import { useEffect, useContext, useState } from "react"
import { ScannerContext } from '../scannerContext/ScannerContext'

function CamaraScanner({handleCam}) {
  const [camR, setCamR] = useState(false)
  const { filterScannerContext } = useContext(ScannerContext)


  const handleRotateCam = () => {
    if(camR == false){
      setCamR(true)
    }else{
      setCamR(false) 
    }
  }

  const camStop = () => {
    setInitButton(false)
  } 

  useEffect(() => {
    // Configuración de Quagga
    const config = {
      inputStream: {
        type: 'LiveStream',
        constraints: {
          aspectRatio: { ideal: window.innerWidth / window.innerHeight }, //relación de aspecto del viewport
          width: { ideal: window.innerWidth },
          height: { ideal: window.innerHeight },
          facingMode: camR ? "user" : "environment", // Puedes cambiarlo según la cámara que desees utilizar
        },
      },
      locator: {
        patchSize: 'x-large',
        halfSample: false,
        debug: true,
        area: { 
          top: "40%",
          right: "30%",
          left: "30%",
          bottom: "40%"  
        },
      },
      numOfWorkers: navigator.hardwareConcurrency,
      decoder: {
        readers: ['ean_reader', 'upc_reader'],
      },
      locate: false,
      frecuency: 8,

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
        handleCam(false)
      }
    });

  }, [camR]);

  return (
    <>
      <button className='rotate-cam' onClick={handleRotateCam}><IconCameraRotate color='white'/></button>
      <div id="interactive" className="viewport" />
      
    </>
  );
};

export default CamaraScanner