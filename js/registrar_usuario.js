/*
  Página registra un usuario en la base de datos
  Autor: Javier Ramos Marco
  Fecha: 3-01-2020
*/

// Firebase con Authentication para usuarios
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var infoRegistro = document.querySelector("#infoRegistro");

//Se captura el usuario y contraseña del formulario y se registra
$("#registrar").click(function(event){
	event.preventDefault();

	var email = $("#inputEmail").val();
	var contrasena = $("#inputPassword").val();

	firebase.auth().createUserWithEmailAndPassword(email, contrasena).then(function(){
		infoRegistro.textContent = "Registro correcto";
		verificar();
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  infoRegistro.textContent = error.message;
	  // ...
	});
	

});

//Función que comprueba si hay una sesion actiba
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

//Función para modificar los iconos cuando la sesion esta activa
function usuarioRegistrado(email){
	 $("#RegistrarBarNav").html("<li class='nav-item'><a class='nav-link disabled' href='#'>" + email + "</a></li>");
	 //Cambiar icono de iniciar sesion por uno de cerrar sesion
	 $("#IniciarSesionBarNav").html("<button id='cerrarSesionBoton' onclick='cerrar(juan)' class='btn btn-secondary my-2 my-sm-0' type='submit'>Cerrar Sesion</button>");
}

//Función para cambiar los iconos cuando se cierra la sesion
function cerrar(nombre){
	console.log("Click salir"+nombre);
	firebase.auth().signOut().then(function(){
		//Cambiar boton con el nombre del usuario por uno de registrar usuario
		$("#RegistrarBarNav").html("<li class='nav-item'><a class='nav-link' href='registrar_usuario.html'><i class='fas fa-user-plus'></i> Registrarse</a></li>");
	 	//Cambiar boton de cerrar sesion por uno de iniciar sesion
	 	$("#IniciarSesionBarNav").html("<li class='nav-item'><a class='nav-link' href='iniciar_sesion.html'><i class='fas fa-user'></i> Iniciar Sesion</a></li>");
	}).catch(function(error){
		console.log(error);
	})
}

//Función que envia un correo electronico al usuario para verificar su cuenta
function verificar(){
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
     // Email sent.
	}).catch(function(error) {
    // An error happened.
	});
}