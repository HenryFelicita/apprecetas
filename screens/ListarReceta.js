import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground} from 'react-native'

//************************************** IMPORTAR FIREBASE *****************************************/
import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'

const db = getFirestore(appFirebase)

//*************************************** BACK END ****************************************************/
export default function ListarReceta(props) {
  //LOGICA PARA LISTAR
  const [lista, setLista] = useState([])

  // logica para llamara la lista de documentos de la coleccion de la BASE
  useEffect(() => {
    const getLista = async()=>{
        try {
            const querySnapshot = await getDocs(collection(db, 'recetas'))
            const docs = []
            querySnapshot.forEach((doc)=>{
                const {nombre, descripcion, ingrediente, preparacion} = doc.data()
                docs.push({
                    id:doc.id,
                    nombre,
                    descripcion,
                    ingrediente,
                    preparacion,
                    
                })
            })
            setLista(docs);
        } catch (error) {
            console.log(error);
        }
    }
    getLista()
    }, [lista])

    //************************************* FRONT END *******************************************/
  return (
    <ScrollView style={styles.scrollView}>
      <TouchableOpacity style={styles.Boton} onPress={()=>props.navigation.navigate('Crear')}>
        <Text style={styles.TextoBoton}>AGREGAR RECETA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Boton} onPress={()=>props.navigation.navigate('Favoritos')}>
        <Text style={styles.TextoBoton}>FAVORITOS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Boton} onPress={()=>props.navigation.navigate('Comprar Ingredientes')}>
        <Text style={styles.TextoBoton}>LISTA DE COMPRAS</Text>
      </TouchableOpacity>
      
      <View>
        <Text style ={styles.TextoTitulo}>LISTA DE RECETAS</Text>
      </View>
      
      <View>
        {
          lista.map((list)=>(
            <TouchableOpacity key={list.id} style={styles.BotonLista} 
            onPress={()=>props.navigation.navigate('Mostrar',{recetaId:list.id})}>
                <Text style={styles.TextoNombre}>-{list.nombre}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
      
    </ScrollView>
    
  );
}


  //***************************************** STYLE *********************************************/
  const styles = StyleSheet.create({
  Boton:{
      backgroundColor:'white',
      height:35,
      borderColor:'maroon',
      borderWidth:1
  },
  TextoBoton:{
    fontSize:18,
    textAlign:'center'
  },
  TextoTitulo:{
    textAlign:'center',
    marginTop:50,
    marginBottom:10,
    color: 'white',
    fontSize: 25,
  },  
  TextoNombre:{
    fontSize:18
  },
  BotonLista:{
    backgroundColor:'#DDDDDD',
    borderBottomWidth:1,
    borderBottomColor:'#cccccc',
    marginBottom:3,
    padding:5
  },
  scrollView: {
    backgroundColor: 'maroon',
    marginHorizontal: 2,
  },
  
})