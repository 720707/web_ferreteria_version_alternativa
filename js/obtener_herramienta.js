/*
  Página para obtener la información de una herramienta
  Autor: Javier Ramos Marco
  Fecha: 3-01-2020
*/
// Your web app's Firebase configuration
console.log("Script para herramienta individual");
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

//Funcion para obtener el valor de una cookie segun su nombre
//Para pasar parametros entre páginas se ha hecho uso de las cookies
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Se obtiene el valor de las cookies
var nom_producto = getCookie("nom_producto");
var coleccion = getCookie("nom_coleccion");

//Funcion para obtener la información de un herramienta especifica mediante el nombre
//de esta
db.collection(coleccion).where("Nombre", "==", nom_producto)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        	//Según pertenezca el producto a una coleccion u a otra se mostraran datos distintos
        	if(coleccion == "herramientas_electricas" || coleccion == "herramientas_manuales"){
        		$("#producto").append("<hr class='featurette-divider'> " + 
	        	"<div class='row featurette'>" 
	        	+ "<div class='col-md-7 order-md-2 info_producto'>" +
	        	"<p><font size='3'>&nbsp <b>" + doc.data().Nombre + "</b> </p>"+
	        	"<p>Precio: &nbsp" + doc.data().Precio + "</p>"+ 
	        	"<p>Unidades Disponibles: &nbsp " + doc.data().Unidades +" </p>" + 
	        	"<p>Marca: &nbsp " + doc.data().Marca + "</p>" +
	        	"<p>Otras características: &nbsp Medidas : " + doc.data().Medidas + "</p>" +
	        	"<p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Peso: " + doc.data().Peso + "</p>" +
	        	"</div>" +
	        	"<div class='col-lg-4 col-md-6 col-sm-6 order-md-1'>" +
	        	"<img src=" + doc.data().Imagen + " width='300' height='275'>"
	        	+ "</div> </div>" +
	            "<br><button id='boton_comprar' class='btn btn-primary' type='button'><i class='fas fa-shopping-cart'></i>&nbspComprar</button> ");
        	}else{
        		$("#producto").append("<hr class='featurette-divider'> " + 
	        	"<div class='row featurette'>" 
	        	+ "<div class='col-md-7 order-md-2 info_producto'>" +
	        	"<p><font size='3'>&nbsp <b>" + doc.data().Nombre + "</b> </p>"+
	        	"<p>Precio: &nbsp" + doc.data().Precio + "</p>"+ 
	        	"<p>Unidades Disponibles: &nbsp " + doc.data().Unidades +" </p>" + 
	        	"<p>Marca: &nbsp " + doc.data().Marca + "</p>" +
	        	"<p>Otras características: &nbsp Potencia : " + doc.data().Potencia + "</p>" +
	        	"</div>" +
	        	"<div class='col-lg-4 col-md-6 col-sm-6 order-md-1'>" +
	        	"<img src=" + doc.data().Imagen + " width='300' height='275'>"
	        	+ "</div> </div>" +
	        	 "<br><button id='boton_comprar' class='btn btn-primary' type='button'><i class='fas fa-shopping-cart'></i>&nbspComprar</button> ");
        	}
            
    	});
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

