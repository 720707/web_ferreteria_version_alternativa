/*
  Página que muestra una imágen, nombre y precio para cada herramienta manual.
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
	firebase.auth().signOut().then(function(){
		//Cambiar boton con el nombre del usuario por uno de registrar usuario
		$("#RegistrarBarNav").html("<li class='nav-item'><a class='nav-link' href='registrar_usuario.html'><i class='fas fa-user-plus'></i> Registrarse</a></li>");
	 	//Cambiar boton de cerrar sesion por uno de iniciar sesion
	 	$("#IniciarSesionBarNav").html("<li class='nav-item'><a class='nav-link' href='iniciar_sesion.html'><i class='fas fa-user'></i> Iniciar Sesion</a></li>");
	}).catch(function(error){
		console.log(error);
	})
}


//Obtener las herramientas electricas de la DB y crear un featurette para cada herramienta
//Se pone a la imagen a la escucha del evento onClick() y se llama a la función crearDocumento() y 
//setCookie() para pasar parametros entre páginas
db.collection("herramientas_manuales").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        $(".herramientas_manuales").append("<hr class='featurette-divider'> " + 
        	"<div class='row featurette'>" 
        	+ "<div class='col-md-7 info_producto'>" +
        	"<p><font size='3'>&nbsp <b>" + doc.data().Nombre + "</b> </p>"+
        	"<p>Precio: &nbsp" + doc.data().Precio + "</p>"+ 
        	"</div>" +
        	"<div class='col-lg-4 col-md-6 col-sm-6'>" +
        	"<img onClick='crearDocumento(), setCookie(\"nom_producto\",\"" +doc.data().Nombre+ "\",1), "
        	+"setCookie(\"nom_coleccion\",\"herramientas_manuales\",1)' src=" + doc.data().Imagen + " width='150' height='125'>"
        	+ "</div> </div>");
    });
});

//Función para crear una cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


//Funcion para crear un nuevo documento donde se mostrará la informacion de la herramienta seleccionada
function crearDocumento(){
	var doc = document.open("text/html","replace");
	var cabecera = "<!DOCTYPE html> <html> <head> <title>La Broca</title>" +
	"<meta name='viewport' content='width=device-width, initial-scale=1'>" +
    "<link rel='stylesheet' type='text/css' href='../bootstrap-4.3.1-dist/css/bootstrap.css'>"+
    "<script src='../js/jquery-3.4.1.js' async></script>"+
    "<script src='../bootstrap-4.3.1-dist/js/bootstrap.min.js' async></script>"+
    "<link rel='stylesheet' type='text/css' href='../css/productos.css'>"+
    "<link href='https://fonts.googleapis.com/css?family=Lato:400,700&display=swap' rel='stylesheet'>"+
    "<script src='https://kit.fontawesome.com/2ec255ffb9.js' crossorigin='anonymous'async></script>"+
    "<script src='https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js' async></script>"+
    "<script src='https://www.gstatic.com/firebasejs/7.5.0/firebase-analytics.js' async></script>"+
    "<script src='https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js' async></script>"+
    "<script src='https://www.gstatic.com/firebasejs/6.2.0/firebase-firestore.js' async></script>"+
	"<script>"+
	   "$(function(){"+
        "$('#includedBar').load('barra_navegacion.html');"+ 
        "$('#includedFooter').load('footer.html');"+
       "});"+
    "</script> </head> <body> "+
    "<div id='includedBar'></div>"+
    "<div class ='container'> <div id='producto'> </div> </div> <div id='includedFooter'>  </div>"+
    "<script type='text/javascript' src='../js/obtener_herramienta.js' async></script>"+
    "</body></html>";

	doc.write(cabecera);
	doc.close();

}
