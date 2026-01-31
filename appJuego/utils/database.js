import * as SQLite from 'expo-sqlite';

//crear la base de datos
export const abrirDatabase = async () => {
    return await SQLite.openDatabaseAsync('juego3enraya.db');
};

//Inicializar la base de datos 
export const initDatabase = async () => {
    const db = await abrirDatabase();
    try {
        //Crear tabla
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS partidas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            jugador TEXT NOT NULL,
            nivel TEXT NOT NULL,
            resultado TEXT NOT NULL
        );
        `);
        console.log("Base de datos inicializada");
    } 
    catch (error) {
        console.error("Error al crear tabla: ", error);
        throw error;
    }
};

// Guardar una partida
export const guardarPartida = async (jugador, nivel, resultado) => {
    const db = await abrirDatabase();
    try {
        //Consulta
        const result = await db.runAsync(
        'INSERT INTO partidas (jugador, nivel, resultado) VALUES (?, ?, ?);',
        [jugador, nivel, resultado]
        );
        console.log("Partida guardada en SQLite");
        return result.lastInsertRowId; // Retorna el ID generado
    } catch (error) {
        console.error("Error al guardar: ", error);
        throw error;
    }
};

// Obtener todas las partidas
export const obtenerPartidas = async () => {
    const db = await abrirDatabase();
    try {
        //Consulta
        const allRows = await db.getAllAsync('SELECT * FROM partidas ORDER BY id DESC LIMIT 10;');
        return allRows;
    } catch (error) {
        console.error("Error al obtener partidas: ", error);
        throw error;
    }
};

// borrar todas las partidas
export const borrarPartidas = async () => {
    const db = await abrirDatabase();
    try {
        await db.runAsync('DELETE FROM partidas');
        console.log("Historial borrado");
    } catch (error) {
        console.error("Error al borrar partidas: ", error);
        throw error;
    }
};