import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ScrollView, TextInput, Button,Alert } from 'react-native';

//************************************** IMPORTAR FIREBASE *****************************************/
import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'

const db = getFirestore(appFirebase)

//*************************************** BACK END ****************************************************/
export default function CrearReceta(props) {
  //LOGICA
  //VARIABLES PARA GUARDAR EN LA FIREBASE
  const initialState = {
    nombre:'', 
    descripcion:'',
    ingrediente:'',
    preparacion:'',
  }

  const [state, setState]= useState(initialState)

  //FUNCION QUE CAPTURA LOS DATOS
  const handleChangeText = (value, name)=>{
    setState({...state, [name]:value})
  }

  //GUARDA LOS DATOS
  const saveReceta = async()=>{

    try{
      await addDoc(collection(db, 'recetas'),{
        ...state
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
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Crear Receta</Text>

      <View style={styles.inputgroup}>
        <TextInput placeholder='NombreReceta' 
        onChangeText={(value)=>handleChangeText(value, 'nombre')}/>
      </View>

      <View style={styles.inputgroup}>
        <TextInput placeholder='Descripcion' 
        onChangeText={(value)=>handleChangeText(value, 'descripcion')} 
          />
      </View>

      <View style={styles.inputgroup}>
        <TextInput placeholder='Ingredientes' 
        onChangeText={(value)=>handleChangeText(value, 'ingrediente')} />
      </View>

      <View style={styles.inputgroup}>
        <TextInput placeholder='Preparación' 
        onChangeText={(value)=>handleChangeText(value, 'preparacion')} />
      </View>

      <View>
        <Button title='GUARDAR RECETA' onPress={saveReceta}/>
      </View>
    </ScrollView>
  );
}

//************************************* STYLE *******************************************/
const styles = StyleSheet.create({
  titulo:{
    textAlign:'center',
    fontSize:18,
    marginTop:12,
    marginBottom:20
  },  
  container:{
    flex:1,
    padding:25
  },  
  inputgroup:{
    flex:1,
    padding:5,
    marginBottom:20,
    borderBottomWidth:1,
    borderBottomColor:'#cccccc',
  }, 
  Boton:{
    backgroundColor:'white',
    height:35,
    borderColor:'maroon',
    borderWidth:1
},
  
});