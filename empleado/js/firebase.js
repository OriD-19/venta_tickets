import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Función exclusiva para administradores. Permite registrar un nuevo usuario en la base de datos
// Este puede tener credenciales de administrador o de empleado (usuario autorizado)
export async function registerUser(email, password, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // store the rest of the information in the users collection
        await setDoc(doc(db, "usuarios", user.uid), {
            email,
            role,
        });

        console.log("Usuario registrado: ", user);
    } catch (e) {
        console.error("Error al registrar usuario: ", e);
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
            sessionStorage.setItem("uid", user.uid);
            window.location.href = "inicio_empleado.html";
        }

    } catch (e) {
        console.error("Error al loguear usuario: ", e);
    }
}
