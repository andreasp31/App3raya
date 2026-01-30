import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TouchableOpacity, Text, ActivityIndicator, FlatList } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { obtenerPartidas } from '../utils/database';
//Estructura de la partida 
interface Partida {
  id: number;
  jugador: string;
  nivel: string;
  resultado: string;
}

export default function Puntuaciones() {

  //Para cambiar entre pantallas
  const router = useRouter();
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [cargando, setCargando] = useState(true);

  //Cargar datos al abrir la vista
  useEffect(()=>{
    const cargarDatos = async()=>{
      try{
        const respuesta = await obtenerPartidas();
        setPartidas(respuesta || []);
      }
      catch(error){
        console.log("Error cargando puntuaciones", error);
      }
      finally {
        setCargando(false);
      }
    };
    cargarDatos();
  },[]);

  const listarPartida = ({item}:{item:Partida}) =>(
    <View>
      <View style={styles.fila}>
        <View style={styles.columna}>
          <Text style={styles.textoHueco}>{item.jugador}</Text>
        </View>
        <View style={styles.columna}>
          <Text style={styles.textoHueco}>{item.nivel}</Text>
        </View>
        <View style={styles.columna}>
          <Text style={styles.textoHueco}>{item.resultado}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
    <Stack.Screen options={{ headerShown: false }} />
      <Image source={require('../assets/images/logoJuego.png')} style={styles.foto2}></Image>
      <Text style={styles.textos}>Puntuaciones</Text>
      <FlatList
            data={partidas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={listarPartida}
            ListEmptyComponent={<Text>Aún no hay partidas guardadas</Text>}
        />
      <View style={styles.container2}>
        <TouchableOpacity style={styles.miBoton3} onPress={() => router.back()}>
          <Text style={styles.miTextoBoton}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>  
  );
}

const styles = StyleSheet.create({
  fila:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
    width:350,
    borderColor: '#ad4133ff',
    borderWidth: 1,
    borderRadius: 10
  },
  columna:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoHueco:{
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },
  container2: {
    alignItems: 'center',
    backgroundColor: "white",
    gap:20,
  },
  miBoton3:{
    backgroundColor: "black",
    padding:10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    marginTop:5
  },
  textos:{
    fontSize:20,    
    color:"black",
    marginBottom: 30
  },
  miTextoBoton:{
    color:"white",
  },
  foto2: {
    height: 240,
    width: 240,
    resizeMode: "contain"
  }
});
