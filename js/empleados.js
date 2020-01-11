/*
  Página para obtener la información de los empleados
  Autor: Javier Ramos Marco
  Fecha: 3-01-2020
*/
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBr3K0g46i_ZQVj_YsIisccyL2S_9TZc_0",
	authDomain: "ferreteria-81897.firebaseapp.com",
	databaseURL: "https://ferreteria-81897.firebaseio.com",
	projectId: "ferreteria-81897",
	storageBucket: "ferreteria-81897.appspot.com",
	messagingSenderId: "1093455286088",
	appId: "1:1093455286088:web:22df8c50daa880e45b6d7d",
	measurementId: "G-3F79NE21KJ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

//Obtener la base de datos
var db = firebase.firestore();

function observador(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	//$("#iniciarSesionBarNav").html("<li class='nav-item'><a class='nav-link'><i class='fas fa-user-plus'></i>" +</a></li></span>);
	    // User is signed in.
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    usuarioRegistrado(email);
	    // ...
	  } else {
	    // User is signed out.
	    // ...
	  }
	});
}

observador();

//Función que comprueba si la sesión del usuario esta ya iniciada y cambia los botones
function usuarioRegistrado(email){
	//Cambiar boton de registrar usuario por el nombre del usuario
	$("#RegistrarBarNav").html("<li class='nav-item'><a class='nav-link disabled' href='#'>" + email + "</a></li>");
	//Cambiar bton de iniciar sesion por uno de cerrar sesion
	$("#IniciarSesionBarNav").html("<button id='cerrarSesionBoton' onclick='cerrar()' class='btn btn-secondary my-2 my-sm-0' type='submit'>Cerrar Sesion</button>");
}

//Función para cerrar sesion, y se cambian los botones a los iniciales
function cerrar(){
	console.log("Click salir");
	firebase.auth().signOut().then(function(){
		//Cambiar boton con el nombre del usuario por uno de registrar usuario
		$("#RegistrarBarNav").html("<li class='nav-item'><a class='nav-link' href='registrar_usuario.html'><i class='fas fa-user-plus'></i> Registrarse</a></li>");
	 	//Cambiar boton de cerrar sesion por uno de iniciar sesion
	 	$("#IniciarSesionBarNav").html("<li class='nav-item'><a class='nav-link' href='iniciar_sesion.html'><i class='fas fa-user'></i> Iniciar Sesion</a></li>");
	}).catch(function(error){
		console.log(error);
	})
}

//Obtener los empleados de la DB y crear un dropdown para cada uno
db.collection("empleados").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        $(".row").append("<div class='col-lg-4 dropdown'>"+
        "<img class ='empleado rounded-circle' src=" + doc.data().imagen +" width='200' height='140'>" +
        "<div class='dropdown-content'>" + 
        "<img src=" + doc.data().imagen + " width='300' height='200'> " +
        "<p>Puesto: &nbsp " + doc.data().puesto + "<br>Sobre él: &nbsp " + doc.data().descripcion +"</p> </div>"
        + "<h2>" + doc.data().nombre + "</h2> </div>");
    });
});


