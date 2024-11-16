import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, setDoc, getDoc, doc, collection, addDoc, getDocs, query, or, where, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const auth = getAuth(app);

export const guardarConcierto = async (artistaform, descripcionform, fechaform, lugarform, precioPlatinum, precioVIP, precioGeneral, urlImagenform) => {
    try {
        await addDoc(collection(db, "conciertos"), {
            artista: artistaform,
            descripcion: descripcionform,
            fecha: fechaform,
            lugar: lugarform,
            localidades: [
                {
                    tipoBoleto: "Platinum",
                    precio: precioPlatinum,
                    disponibles: 500,
                },
                {
                    tipoBoleto: "General",
                    precio: precioGeneral,
                    disponibles: 1000,
                },
                {
                    tipoBoleto: "VIP",
                    precio: precioVIP,
                    disponibles: 100,
                },
            ],
            urlImagen: urlImagenform,
        });
        alert("Concierto registrado correctamente.");
    } catch (error) {
        console.error("Error al guardar el concierto: ", error);
        alert("Error al guardar el concierto.");
    }
};

export const getConcierto = async (idConcierto) => {
    try {
        const conciertoReferencia = doc(db, "conciertos", idConcierto);
        const conciertoSnapshot = await getDoc(conciertoReferencia);
        return conciertoSnapshot.data();
    } catch (error) {
        console.error("Error al obtener el concierto: ", error);
        return null;
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
        alert("Error al obtener los concierts", error)
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

export const modificarConcierto = async (idConcierto, artistaEdit, descripcionEdit, fechaEdit, lugarEdit, precioPlatinum, precioVIP, precioGeneral, ulrEdit) => {
    try {
        const conciertoReferencia = doc(db, "conciertos", idConcierto);
        await updateDoc(conciertoReferencia, {
            artista: artistaEdit,
            descripcion: descripcionEdit,
            fecha: fechaEdit,
            lugar: lugarEdit,
            localidades: [
                {
                    tipoBoleto: "Platinum",
                    precio: precioPlatinum,
                    disponibles: 500,
                },
                {
                    tipoBoleto: "General",
                    precio: precioGeneral,
                    disponibles: 1000,
                },
                {
                    tipoBoleto: "VIP",
                    precio: precioVIP,
                    disponibles: 100,
                },
            ],
            urlImagen: ulrEdit,
        })
        alert("Concierto modificado con éxito.");
        window.location.reload();        
    } catch (error) {
        console.log(error);      
        alert("No se pudo modificr el concierto.");
    }
}
//créditos: https://www.youtube.com/watch?v=ey4k6mW9ds4&t=1341s

// Función exclusiva para administradores. Permite registrar un nuevo usuario en la base de datos
// Este puede tener credenciales de administrador o de empleado (usuario autorizado)
export async function registerUser(email, password, firstName, lastName, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // store the rest of the information in the users collection
        await setDoc(doc(db, "usuarios", user.uid), {
            email,
            firstName,
            lastName,
            email,
            role,
        });

        console.log("Usuario registrado: ", user);
    } catch (e) {
        console.error("Error al registrar usuario: ", e);
    }
}

export async function comprarBoletos(conciertoId, tipoBoleto, cantidadBoletos) {
    const conciertoReference = doc(db, "conciertos", conciertoId);
    const conciertoSnapshot = await getDoc(conciertoReference);

    const concierto = conciertoSnapshot.data();
    const localidades = concierto.localidades;

    // find the ticket type
    const ticketType = localidades.find((localidad) => localidad.tipoBoleto === tipoBoleto);

    if (ticketType.disponibles >= cantidadBoletos) {
        ticketType.disponibles -= cantidadBoletos;

        // update the concert with the new ticket availability
        await updateDoc(conciertoReference, {
            localidades: [
                ticketType,
                ...localidades.filter((localidad) => localidad.tipoBoleto !== tipoBoleto)
            ]
        });

        alert("Boletos comprados correctamente");
    } else {
        alert("No hay suficientes boletos disponibles");
    }
}

export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //  check if the user is an admin or authorized user
        const userReference = doc(db, "usuarios", user.uid);
        const userSnapshot = await getDoc(userReference);

        if (!userSnapshot.exists()) {
            throw new Error("Usuario no encontrado");
        }

        if (userSnapshot.data().role === "admin" || userSnapshot.data().role === "authorized") {
            console.log("Usuario logueado: ", user);
            return userSnapshot.data();
        }

    } catch (e) {
        console.error("Error al loguear usuario: ", e);
    }
}

export async function editRole(userId, newRole) {
    try {
        const userReference = doc(db, "usuarios", userId);
        await setDoc(userReference, {
            role: newRole,
        }, { merge: true });

        console.log("Rol actualizado correctamente");
    } catch (e) {
        console.error("Error al actualizar rol: ", e);
    }
}

export async function deleteEmpleado(userId) {
    try {
        await deleteDoc(doc(db, "usuarios", userId));
        return true;
    } catch (e) {
        console.error("Error al eliminar empleado: ", e);
        return false;
    }
}

export async function getAllEmployees() {
    try {
        const q = query(collection(db, "usuarios"), 
            or(
                where("role", "==", "admin"),
                where("role", "==", "authorized")
            )
        );

        const querySnapshot = await getDocs(q);

        const employees = [];
        querySnapshot.forEach((doc) => {
            employees.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return employees;
    } catch (e) {
        console.error("Error al obtener empleados: ", e);
        return [];
    }
}
