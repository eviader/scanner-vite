import { createContext, useState, useEffect } from "react";
import { query, orderBy, collection,  onSnapshot, deleteDoc, doc, where, updateDoc, addDoc, getDocs,getDoc, startAt, endAt, getFirestore } from 'firebase/firestore'
import { db } from "../firebase/firebase";

export const ScannerContext = createContext()

export function ScannerContextProvider(props){

    const [articul, setArticul] = useState([])
    const [filterArticul, setFilterArticul] = useState([])
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loadingcComplete, setLoadingComplete] = useState(false)

    useEffect(() => {
        getAll()
    },[])

    async function getAll(){

      const getArticuls =  collection(db, "articulos")

      try{
        onSnapshot(getArticuls, querySnapshot => {
          const dataArray = []
          querySnapshot.forEach(doc => {
          dataArray.push({...doc.data(), id: doc.id})
        })
        const filterUndefined = dataArray.filter(element => element.articulo !== null || undefined);
        setArticul(filterUndefined) 
       })
      }catch(err){
        console.error(err)
      }
    }



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

    const buscarArticulosPorPrefijo = async (code) => {
      try{
        const q = query(collection(db, "articulos"), 
        where("articulo", "==", code));

        const querySnapshot = await getDocs(q);
        const data = []
        querySnapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
        console.log(data)

      }catch(err){
        console.error(err)
      }
    };
    

    async function filterContext(textFilter){
      try{
        const result = articul.filter(art => art.articulo.includes(textFilter.toUpperCase()))
        const dataSort = result.sort((a, b) => {
          if( a.articulo == b.articulo){
            return 0
          }if(a.articulo < b.articulo){
            return -1
          }return 1
        }) 
        if(dataSort.length === 0){
          setFilterArticul(true)
        } 
        setFilterArticul(dataSort)
      }catch(err){
        console.error(err)
      }
    }

    async function filterScannerContext(code){
      try{
        const q = query(collection(db, "articulos"), where("codAlter", "==", code));

        const querySnapshot = await getDocs(q);
        const data = []
        querySnapshot.forEach((doc) => {
          data.push({...doc.data(), id: doc.id})
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
        setFilterArticul([...data])

      }catch(err){
        console.error(err)
      }
    }

    return(
        <ScannerContext.Provider value={
            { 
              articul,
              filterArticul,
              filterContext,
              getFiles,
              filterScannerContext,
              loadingUpdate,
              loadingcComplete,
              buscarArticulosPorPrefijo

            }
        }>
            {props.children}
        </ScannerContext.Provider>
        
    )
}