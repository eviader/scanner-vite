import { createContext, useState, useEffect } from "react";
import { query, orderBy, collection,  onSnapshot, deleteDoc, doc, where, updateDoc, addDoc, getDocs,getDoc, startAt, endAt, getFirestore } from 'firebase/firestore'
import { db } from "../firebase/firebase";

export const ScannerContext = createContext()

export function ScannerContextProvider(props){

    const [filterArticul, setFilterArticul] = useState([])
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loadingComplete, setLoadingComplete] = useState(false)
    const [waitArticulContext, setWaitArticulContext] = useState(false) // spinner de estepra en el componente resulScanner

    //Constante para el caso de que no se encuentre ningun articulo
    const SIN_RESULTADOS = [{
      articulo: "Sin Resultados",
      descripcion: "0",
      precio: 0,
      stock: 0,
      codAlter: "0",
    }]

    //limpiamos la busqueda con esta linea de codigo
    async function cleanListArticuls() {
      setFilterArticul([])  
    }

    async function deleteCollection() {
      console.log('Eliminando base de datos');
      try {
        const querySnapshot = await getDocs(collection(db, "articulos"));
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        console.log('Se elimino correctamente');
      } catch (err) {
        console.log(err);
      }
    }

    //Cargamos un archivo excel y lo agregamos a la base de datos (componente inputFile)
    async function getFiles(files){
      try{   
        await deleteCollection()
        console.log('Agregando nuevos datos')
        setLoadingUpdate(true)
        for(let i = 0; i < files.length; i++){
          const newData = await addDoc(collection(db, "articulos"),{
            articulo: files[i][0],
            descripcion: files[i][1],
            precio: files[i][2],
            stock: files[i][3],
            codAlter: files[i][4]
          })
        }
        console.log("Stock Agregado")
        setLoadingUpdate(false)
        setLoadingComplete[true]
      }catch(err){
        console.error(err)
      }
    }

    //busqueda por articulo Firebase
    const buscarArticulosPorPrefijo = async (textFilter) => {
      cleanListArticuls() //Limpiamos la busqueda
      setWaitArticulContext(true)
      try{
        const q = query(collection(db, "articulos"), 
        where("articulo", ">=", textFilter.toUpperCase()),
        where("articulo", "<", textFilter.toUpperCase() + '\uf8ff'), // '\uf8ff' es un carácter Unicode que garantiza que se incluyan todos los documentos que comienzan con el prefijo.
        orderBy("articulo")); // Ordenar por el campo para que la consulta funcione correctamente.

        const querySnapshot = await getDocs(q);
        const data = []
        querySnapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
          console.log(doc.id, " => ", doc.data());
        });

        if(data.length == 0){
          setWaitArticulContext(false)
          return setFilterArticul(SIN_RESULTADOS)
        }

        setWaitArticulContext(false) 
        return setFilterArticul(data)

      }catch(err){
        console.error(err)
        return [] 
      }
    };

    async function filterScannerContext(code){
      cleanListArticuls()
      setWaitArticulContext(true)
      try{
        const q = query(collection(db, "articulos"), where("codAlter", "==", code));

        const querySnapshot = await getDocs(q);
        const data = []
        querySnapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
          console.log(doc.id, " => ", doc.data());
        });
        if(data.length == 0){
          return setFilterArticul(SIN_RESULTADOS)
        }
        setWaitArticulContext(false)
        setFilterArticul([...data])

      }catch(err){
        console.error(err)
      }
    }

    return(
        <ScannerContext.Provider value= {
            { 
              filterArticul,
              getFiles,
              filterScannerContext,
              loadingUpdate,
              loadingComplete,
              buscarArticulosPorPrefijo,
              waitArticulContext,
              cleanListArticuls

            }
        }>
            {props.children}
        </ScannerContext.Provider>
        
    )
}