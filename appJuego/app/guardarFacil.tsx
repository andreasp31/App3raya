import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Link, useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function JugarFacil() {

    //Para cambiar entre pantallas
    const router = useRouter();
    const [nombreJugador, ponerNombre] = useState("");
    const [mensajeGuardar, ponerMensaje] = useState<String | null>(null);
    // Recogemos lo que enviamos desde la pantalla anterior
    const { resultado, nivel } = useLocalSearchParams();

    const guardarResultado = async()=>{
        if(!nombreJugador){
            nombreJugador == "Jugador";
            return;
        }
        const datosPartida = {
            jugador: nombreJugador,
            nivel:nivel,
            resultado: resultado,
        }
        try{
            const respuesta = await fetch("mongodb+srv://andreasofiapais_db_user:admin123456789@cluster0.dhnz1y7.mongodb.net/",{
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosPartida),
            });
            if(respuesta.ok){
                mensajeGuardar == "Se ha guardado la puntuación"
            }
        }
        catch(error){
            console.log("Error al guardar: ", error);
            mensajeGuardar == "Error al guardar la puntuación"
        }
    }
    
  return (
    <View style={styles.container}>
    <Stack.Screen options={{ headerShown: false }} />
      <Image source={require('../assets/images/logoJuego.png')} style={styles.foto2}></Image>
      <Text style={styles.textos}>Guardar Resultado!</Text>
      <TextInput style={styles.nombre} placeholder="Escribe tu nombre..." value={nombreJugador} onChangeText={ponerNombre}></TextInput>
      <Text>{mensajeGuardar}</Text>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.miBoton1} onPress={guardarResultado}>
          <Text style={styles.miTextoBoton}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miBoton3} onPress={() => router.back()}>
          <Text style={styles.miTextoBoton}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center",
    alignContent:"center",
    backgroundColor: "white",
    gap:20,
  },
  miBoton1:{
    backgroundColor: "#E41922",
    padding:10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
  },
  miBoton3:{
    backgroundColor: "black",
    padding:10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    margin:5
  },
  textos:{
    marginTop: 40,    
    color:"black",
  },
  textoMensaje:{
    marginTop: 20,    
    color:"black",
  },
  miTextoBoton:{
    color:"white",
  },
  foto2: {
    height: 240,
    width: 240,
    resizeMode: "contain"
  },
  nombre: {
    borderWidth: 1,
    borderColor:"red",
    width:200,
    marginTop: 40,
    textAlign:"center",
  }
});
