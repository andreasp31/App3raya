import { Image } from 'expo-image';
import {StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  //Para cambiar entre pantallas
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logoFoto.png')} style={styles.foto}></Image>
      <Image source={require('../assets/images/logoJuego.png')} style={styles.foto2}></Image>
      <Text style={styles.textos}>Juega al 3 en raya con Pucca y Garu!</Text>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.miBoton1} onPress={() => router.push("/nivelJuego")}>
          <Text style={styles.miTextoBoton}>Empezar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miBoton2} onPress={() => router.push("/puntuaciones")}>
          <Text style={styles.miTextoBoton}>Puntuaciones</Text>
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
    alignItems: 'center',
    backgroundColor: "white",
    marginTop: 50,
    gap:20,
  },
  miBoton1:{
    backgroundColor: "#E41922",
    padding:10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    marginTop: 90,
  },
  miBoton2:{
    backgroundColor: "#E41922",
    padding:10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    margin:5
  },
  textos:{
    marginTop: -70,    
    color:"black",
  },
  miTextoBoton:{
    color:"white",
  },
  foto: {
    marginTop: 120,
    height: 220,
    width: 220,
    resizeMode: "contain"
  },
  foto2: {
    marginTop: -80,
    height: 240,
    width: 240,
    resizeMode: "contain"
  }
});
