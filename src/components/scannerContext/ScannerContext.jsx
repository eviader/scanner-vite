import { createContext, useState, useEffect } from "react";
import { query, orderBy, collection,  onSnapshot, deleteDoc, doc, where, updateDoc, addDoc, getDocs,getDoc, startAt, endAt, getFirestore } from 'firebase/firestore'
import { db } from "../firebase/firebase";

export const ScannerContext = createContext()

export function ScannerContextProvider(props){

    const [filterArticul, setFilterArticul] = useState([])
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loadingComplete, setLoadingComplete] = useState(false)
    const [waitArticulContext, setWaitArticulContext] = useState(false) // spinner de estepra en el componente resulScanner

    const SIN_RESULTADOS = [{
      articulo: "SIN RESULTADOS",
      descripcion: "0",
      precio: 0,
      stock: 0,
      codAlter: "0",
    }]

    async function deleteCollection(){
      try{
        await articul.forEach(idArt =>  {
          deleteDoc(doc(db, "articulos", idArt.id));
        })
        console.log('borrando base de datos')
      }catch(err){
        console.log(err)
      }
    }

    //Cargamos un archivo excel y lo agregamos a la base de datos (componente inputFile)
    async function getFiles(files){
      try{   
        await deleteCollection()
        console.log('agregando nuevos datos')
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
        loadingUpdate(false)
        setLoadingComplete[true]
      }catch(err){
        console.error(err)
      }
    }

    //busqueda por articulo Firebase
    const buscarArticulosPorPrefijo = async (textFilter) => {
      setWaitArticulContext(true)
      console.log("estoy aqui")
      console.log(textFilter)
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
        
        setWaitArticulContext(false) 
        return setFilterArticul(data)

      }catch(err){
        console.error(err)
        return [] 
      }
    };

    async function filterScannerContext(code){
      setWaitArticulContext(true)
      try{
        const q = query(collection(db, "articulos"), where("codAlter", "==", code));

        const querySnapshot = await getDocs(q);
        const data = []
        querySnapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
          // doc.data() is never undefined for query doc snapshots
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
              waitArticulContext

            }
        }>
            {props.children}
        </ScannerContext.Provider>
        
    )
}