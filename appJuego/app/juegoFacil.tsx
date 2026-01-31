import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
//Importar la base de datos
import { initDatabase } from '../utils/database';

export default function JugarFacil() {

    //Para cambiar entre pantallas
    const router = useRouter();
    //Array 9 espacios en null al principio
    let [tablero, hacerTablero] = useState(Array(9).fill(null));
    //guardar los indices de la combinación ganadora
    let [combinacionGana, hacerComboGana] = useState<number[] | null>(null);
    // Guardar texto para enseñar quien ganó 
    let [mensajeGanador, ponerMensajeGanador] = useState<String | null>(null);

    // Inicializar base de datos
    useEffect(() => {
        const inicializarDB = async () => {
            try {
                await initDatabase();
                console.log("DB lista para usar");
            } catch (error) {
                console.log("Error inicializando DB: ", error);
            }
        };
        
        inicializarDB();
    }, []);

    //Al tocar una casilla 
    const jugar = (indice: number) =>{
      if(tablero[indice] || combinacionGana){
        return
      };
      //Copia de tablero
      const nuevoTablero = [...tablero];
      //Ficha Pucca
      nuevoTablero[indice] = "X";
      hacerTablero(nuevoTablero);
      
      //Había un error que al ganar yo, la máquina pone una ficha más
      let hayGanador = revisarTablero(nuevoTablero);

      if(!hayGanador){
        //Buscar hueco libre
        let espaciosLibres = [];
        for(let i=0; i<nuevoTablero.length; i++){
          if(nuevoTablero[i] === null){
            espaciosLibres.push(i);
          }
        }
        //Ficha de la máquina
        if(espaciosLibres.length > 0){
          let indiceMaquina = espaciosLibres[Math.floor(Math.random()*espaciosLibres.length)];
          nuevoTablero[indiceMaquina] = "O";
          //Ir comprobando si ya está resuelto el juego
          revisarTablero(nuevoTablero);
        }
        //Guardar los cambios para verse en pantalla
        hacerTablero(nuevoTablero);
      }
      
    }
    
    const revisarTablero =  (t: any[])=>{
      //lista combinaciones 
      const combinaciones = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for(let i=0; i<combinaciones.length; i++){
        let [a, b, c] = combinaciones[i];
        //si la casilla a no está vacía y es igual a b y a c, ya ganó uno
        if (t[a] && t[a] === t[b] && t[a] === t[c]) {
          //Pasar las posiciones de las fichas ganadoras
          hacerComboGana([a,b,c]);
          const ganador = t[a] === 'X' ? "Pucca" : "Garu";
          ponerMensajeGanador("Ha ganado: "+ ganador + "!");
          return true; // Hay ganador
        }
      }
      if (!t.includes(null)) {
        ponerMensajeGanador("Empate!")
        return true; // Hay empate si no hay huecos libres
      }
    };
    
  //Lo que se ve
  return (
    <View style={styles.container}>
    <Stack.Screen options={{ headerShown: false }} />
      <Image source={require('../assets/images/logoJuego.png')} style={styles.foto2}></Image>
      <Text style={styles.textos}>Nivel Fácil!</Text>
      <View style={styles.rejilla}>
        {tablero.map((ficha, i) => {
          const zonaGanadora = combinacionGana && combinacionGana.includes(i);
          return(
            <TouchableOpacity key={i} style={[styles.cuadro, zonaGanadora && styles.fondoGanador]} onPress={() => jugar(i)}>
            {ficha === 'X' && <Image source={require('../assets/images/ficha_pucca.png')} style={styles.pieza} />}
            {ficha === 'O' && <Image source={require('../assets/images/ficha_garu.png')} style={styles.pieza} />}
          </TouchableOpacity>
          )  
      })}
      </View>
      <View>
        {mensajeGanador && (
          <Text style={styles.textoMensaje}>{mensajeGanador}</Text>
        )}
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.miBoton1} onPress={() => {
          router.push({
          pathname: '/guardarFacil', // Nombre de la nueva pantalla
          params: { 
            resultado: mensajeGanador?.toString(), 
            nivel: "Facil" 
          }
        });
        }}>
          <Text style={styles.miTextoBoton}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miBoton3} onPress={() => router.back()}>
          <Text style={styles.miTextoBoton}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>  
  );
}

//Estilos
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
    marginTop: -70,    
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
  rejilla: { 
    width: 300, 
    height: 300, 
    flexDirection: "row", 
    flexWrap: "wrap", 
    marginTop: 40 
  },
  cuadro: { 
    width: 100, 
    height: 100, 
    borderWidth: 1, 
    borderColor: "#ddd7d7ff", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  pieza: { 
    width: 80, 
    height: 80, 
    resizeMode: "contain"
  },
  fondoGanador: {
    backgroundColor:"#F4DEB6",
  }
});
