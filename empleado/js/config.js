import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBo9TOElaN2P8531gzIaMJT8L5br6oP3jg",
    authDomain: "boletosconcierto-12823.firebaseapp.com",
    projectId: "boletosconcierto-12823",
    storageBucket: "boletosconcierto-12823.firebasestorage.app",
    messagingSenderId: "325103399313",
    appId: "1:325103399313:web:69a88f55940296c4be2a30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const guardarConcierto = async (artista, descripcion, fecha, lugar, localidades, precio, urlImagen) => {
    try {
        await addDoc(collection(db, "conciertos"), {
            artista,
            descripcion,
            fecha,
            lugar,
            localidades,
            precio,
            urlImagen
        });
        alert("Concierto registrado correctamente.")
    } catch (error) {
        alert("Error al guardar el concierto: ", error);
    }
}

export const mostrarConciertos = async () => {
    try {
        const conciertos = await getDocs(collection(db, "conciertos")); //de aquí saco todos los documentos de mi coleccin conciertos
        const listaConciertos = [];
        conciertos.forEach((concierto) => { //aqui lo descomprimo y cada documento lo meto en el array
            listaConciertos.push({
                id: concierto.id,
                ...concierto.data(),
            })
        });
        return listaConciertos;
    } catch (error) {
        alert("Error al obtener los conciertos", error)
        return []; //si no se pueden obtener los registros, se regresa un arreglo vacío
    }
}

export const eliminarConcierto = async (idConcierto) => {
    try {
        await deleteDoc(doc(db, "conciertos", idConcierto));
        alert("Se eliminó el concierto")

    } catch (error) {
        console.log(error);
        alert("No se pudo eliminar el concierto.")
    }
}


//créditos: https://www.youtube.com/watch?v=ey4k6mW9ds4&t=1341s