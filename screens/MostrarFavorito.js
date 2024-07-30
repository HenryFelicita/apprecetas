import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert,Button} from 'react-native'

//************************************** IMPORTAR FIREBASE *****************************************/
import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'

const db = getFirestore(appFirebase)


//*************************************** BACK END ****************************************************/
export default function MostrarFavorito(props) {

  //TRAER MOSTRAR LISTA
  const [product, setProduct] = useState({})

  const getOneProduct = async(id)=>{
    try{
      const docRef = doc(db, 'favoritos', id)
      const docSnap = await getDoc(docRef)
      setProduct(docSnap.data())
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getOneProduct(props.route.params.favoritoId)
  },[])

  const deleteProduct = async(id)=>{ 
    await deleteDoc(doc(db,'recetas', id))
    Alert.alert('Exito', 'Receta eliminada')
    props.navigation.navigate('PLATOS TIPOCOS ECUADOR')
  }

  //favoritoo
  const initialState = {
    nombre:(product.nombre), 
    descripcion:(product.descripcion),
    ingrediente:(product.ingrediente),
    preparacion:(product.preparacion)
  }

  //GUARDA LOS DATOS
  const saveReceta = async()=>{

    try{
      await addDoc(collection(db, 'favoritos'),{
        ...initialState
      })
      //MOSTRAR MENSAJE QUE GUARDO EN FIREBASE
      Alert.alert('Alerta', 'Guardado con exito')
      //REDIRECCIONAMOS
       props.navigation.navigate('PLATOS TIPOCOS ECUADOR') 
    }
    catch{
      console.error(error)
    }
  }


  //************************************* FRONT END *******************************************/
  const Separator = () => <View style={styles.separator} />;

  return (
    <View>
      <Text style={styles.titulo} >DETALLE DE LA RECETA</Text>
      
        <Text style={styles.sub}> {product.nombre}</Text>
        
        
        <Text style={styles.sub}> {product.descripcion}</Text>
        <Separator />
        <Text style={styles.sub}>Ingredientes: {product.ingrediente}</Text>
        <Separator />
        <Text style={styles.sub}>Preparación: {product.preparacion}</Text>
        
        <TouchableOpacity style={styles.BotonLista} onPress={()=>deleteProduct(props.route.params.recetaId)}>
         <Text style={styles.TextoNombre}>Eliminar</Text>
        </TouchableOpacity>

        <View>
          <Button title='GUARDAR RECETA' onPress={saveReceta}/>
        </View>


    </View>
  );
}

//****************************************** STYLE **********************************************/
const styles = StyleSheet.create({
  titulo:{
    textAlign:'center',
    marginTop:10,
    marginBottom:10,
    fontSize:20
  },
  sub:{
    fontSize:16
  },
  
  TextoNombre:{
    fontSize:16,
    textAlign:'center',
    color:'white',
    
  },
  BotonLista:{
    backgroundColor:'red',
    borderBottomWidth:1,
    borderBottomColor:'#cccccc',
    marginBottom:3,
    padding:5,
    marginTop:5
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});