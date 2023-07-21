import { createContext, useState, useEffect } from "react";
import { query, orderBy, collection,  onSnapshot, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore'
import { db } from "../firebase/firebase";

export const ScannerContext = createContext()

export function ScannerContextProvider(props){

    const [articul, setArticul] = useState([])
    const [filterArticul, setFilterArticul] = useState([])

    
    useEffect(() => {
        getAll()
    },[])

    async function getAll(){
      const geArticuls =  collection(db, "articulos")

      try{
        onSnapshot(geArticuls, querySnapshot => {
          const dataArray = []
          querySnapshot.forEach(doc => {
          dataArray.push({...doc.data(), id: doc.id})
        })
        const filterUndefined = dataArray.filter(element => element !== undefined);
        setArticul(filterUndefined)
        })
      }catch(err){
        console.error(err)
      }
    }

    async function deleteCollection(){
      try{
        articul.forEach(idArt =>  {
          deleteDoc(doc(db, "articulos", idArt.id));
      })
      }catch(err){
        console.log(err)
      }
    }

    async function getFiles(files){
      try{   
        deleteCollection()

        for(let i = 0; i < files.length; i++){
          const newData = await addDoc(collection(db, "articulos"),{
            articulo: files[i][0],
            descripcion: files[i][1],
            precio: files[i][2],
            codAlter: files[i][3]
          })
        }
        console.log("Stock Agregado")
      }catch(err){
        console.err(err)
      }

    }

    function filterContext(textFilter){
      const result = articul.filter(art => art.articulo.includes(textFilter.toUpperCase()))
      setFilterArticul(result)
    }

    return(
        <ScannerContext.Provider value={
            { 
              articul,
              filterArticul,
              filterContext,
              getFiles
            
            }
        }>
            {props.children}
        </ScannerContext.Provider>
        
    )
}