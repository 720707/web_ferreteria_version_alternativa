/*
  Página que comprueba si el usuario esta en la base de datos
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
var infoInicioSesion = document.querySelector("#infoInicioSesion");

//Se captura el usuario y contraseña del formulario y se registra en la base de datos
$("#iniciar_sesion").click(function(event){
	event.preventDefault();

	var email = $("#inputEmail").val();
	var contrasena = $("#inputPassword").val();

	firebase.auth().signInWithEmailAndPassword(email, contrasena).then(function(){
		infoInicioSesion.textContent = "Inicio de sesión correcto";
	}).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		infoInicioSesion.textContent = error.message;
	});
	

});


function observador(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
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

function cerrar(){
	firebase.auth().signOut().then(function(){
		//Cambiar boton con el nombre del usuario por uno de registrar usuario
		$("#RegistrarBarNav").html("<li class='nav-item'><a class='nav-link' href='registrar_usuario.html'><i class='fas fa-user-plus'></i> Registrarse</a></li>");
	 	//Cambiar boton de cerrar sesion por uno de iniciar sesion
	 	$("#IniciarSesionBarNav").html("<li class='nav-item'><a class='nav-link' href='iniciar_sesion.html'><i class='fas fa-user'></i> Iniciar Sesion</a></li>");
	}).catch(function(error){
		console.log(error);
	})
}

