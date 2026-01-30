import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Link, useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { initDatabase, guardarPartida } from '../utils/database';

export default function JugarFacil() {

    //Para cambiar entre pantallas
    const router = useRouter();
    const [nombreJugador, ponerNombre] = useState("");
    const [mensajeGuardar, ponerMensaje] = useState(null);
    // Recogemos lo que enviamos desde la pantalla anterior
    const { resultado, nivel } = useLocalSearchParams();

    //Inicializar la base de datos
    useEffect(() => {
        initDatabase().catch(error => {
            console.log('Error inicializando DB:', error);
        });
    }, []);
    
    const guardarResultado = async () => {
        // Si no hay nombre, usa "Jugador" por defecto
        if (!nombreJugador.trim()) {
            ponerNombre("Jugador");
        }

        try {
            // Guardar en SQLite (LOCAL - sin servidor)
            const id = await guardarPartida(
                nombreJugador || "Jugador",
                nivel || "Difícil",
                resultado || "Empate"
            );
            
            console.log("Partida guardada con ID:", id);
        
            
            // Espera 1.5 segundos y regresa
            setTimeout(() => {
                router.back();
            }, 1500);
            
        } catch (error) {
            console.log("Error al guardar:", error);
        } finally {
        }
    };


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
