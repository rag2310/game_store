//import
import config from './../config'
import firebase from 'firebase'
import page from 'page'

//configuracion del firebase
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}


//variables
const db = firebase.database()

//CREACION DEL FORMULARIO DEL LOGIN
var loginTemplate = `
	<div class="col-md-12" style= "text-align: center">
		<h2 class="section-title">Sign in/ Sign up</h2>
			<div>
				<form>
					<div class = "col-md-12"  >
						<label>email</label>
						<input type="email" name="email" id="email" style = "padding: 10px 56px" >
						<label style = "margin-left: 13px">Password</label>
						<input type="password" name="psw" id="password" style = "padding: 10px 56px" >
					</div>
					<div class = "col-md-12" style = "margin-top:21px">
						<a id="loginEmail" class= "button">Login con EMAIL</a>
					</div>
				</form>
			</div>
		</div> <!-- .column -->
	</div> <!-- .row -->
`

var template = `
	<div class="container">
		<div class="page">
			<table class="cart">
				<tbody>
					<tr>
						<td class="product-name  login-container">
							${loginTemplate}
						</td>
					</tr>
				</tbody>
			</table
		</div>
	</div> <!-- .container -->
`

//URL DE LA PAGINA DEL LOGIN
page('/login', ()=> {

	//OBTENEMOS INFORMACION DEL USUARIO LOGUEADO
	firebase.auth().onAuthStateChanged(function(user) {
		
		//VERIFICAMOS AL USUARIO LOGUEADO
		if (user) {

			//OBTENEMOS LA ETIQUETA MAIN DEL HTML
			var main = document.querySelector('main')
			main.innerHTML = template
			let loginContainer = document.querySelector('.login-container')

			let html = `
				<div class="col-md-12" style= "text-align: center">
					<h2 class="section-title">Bienvenido ${user.email} </h2>
					<div class = "col-md-12">
						<a id="salir" href="!#" class="waves-effect waves-light btn red darken-1">Salir</a>
					</div>
				</div>
			`


			loginContainer.innerHTML = html

			//AÑADIMOS EL EVENTO CLICK AL BOTON SALIR
			var btnSalir = document.querySelector('#salir')
			btnSalir.addEventListener('click', logout)
		} else {

			//OBTENEMOS LA ETIQUETA MAIN DEL HTML
			var main = document.querySelector('main')
			main.innerHTML = template

			//AÑADIMOS EL EVENTO CLICK AL BOTON LOGIN
			var btnLoginEmail = document.querySelector('#loginEmail')
			if (btnLoginEmail) btnLoginEmail.addEventListener('click', loginEmail)
		}
	});
})

function loginEmail (e) {

	e.preventDefault()	

	//OBTENEMOS LA INFORMACION DE LOS INPUT DE EMAIL Y PASSWORD
	var email = document.querySelector('#email').value
	var pass = document.querySelector('#password').value

	//EL USUARIO SE LOGUEA
	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {

		//VARIABLES
		var errorCode = error.code;
		var errorMessage = error.message;

		//LE INFORMAMOS AL USUARIO QUE NO EXISTE QUE SI DESEA REGISTRARSE
		var registrarse = confirm("Este usuario no existe")

		//SI LA RESPUESTA ES AFIRMATIVO SE PROCEDE A REGISTRAR AL USUARIO
		if (registrarse) {
			
			//CREAMOS AL USUARIO
			firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			})			

			//OBTENEMOS LA INFORMACION DEL USUARIO REGISTRADO QUE YA SE ENCUENTRA LOGUEADO
			firebase.auth().onAuthStateChanged(function(user) {

				//VERIFICAMOS LA INFORMACION DEL USUARIO 
				if (user) {

					//HACEMOS REFERENCIA A LA TABLA USERS DE LA BASE DE DATOS
					var ref = db.ref("users")

					//INSERTAMOS EN LA TABLA USERS
					ref.push({							
						displayName : user.email,
						email : user.email,
						emailVerified : user.emailVerified,
						photoURL : user.photoURL,
						providerData : user.providerData,
						tipo : "cliente",
						uid : user.uid
					})
				} 
			});
		}
	})

	//OBTENEMOS LA INFORMACION DEL USUARIO
	firebase.auth().onAuthStateChanged(function(user) {

		//VERIFICAMOS AL USUARIO LOGUEADO
		if (user) {

		//INSERTAMOS INFORMACION DEL USUARIO AL HTML
		let loginContainer = document.querySelector('.login-container')

		let html = `
			<div class="col-md-12" style= "text-align: center">
			<h2 class="section-title">Bienvenido ${user.email} </h2>
			<div class = "col-md-12">
			<a id="salir" href="!#" class="waves-effect waves-light btn red darken-1">Salir</a>
			</div>
			</div>
		`
		loginContainer.innerHTML = html

		//AGREGAMOS EL EVENTO CLICK A SALIR
		var btnSalir = document.querySelector('#salir')
		btnSalir.addEventListener('click', logout)
		} 
	});
}

function logout (e) {

	e.preventDefault()

	//DESPUES DE SALIR DE LA SECCION SE REDIRECCIONA A HOMEPAGE
	firebase.auth().signOut().then(() => {
		page.redirect('/')
	})
	.catch((error) => {
		console.log(err.message)
	})
}
