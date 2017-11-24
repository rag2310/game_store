//IMPORT
import page from 'page'
import firebase from 'firebase'
import config from './../config'

//CONFIGURAR FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

//VARIABLES
const db = firebase.database()
var admin = false

//OBTENEMOS INFORMACION DEL USAURIO
firebase.auth().onAuthStateChanged(function(user) {

	//VERIFICAMOS AL USUARIO LOGUEADO
	if (user) {

		//OBTEMOS LOS DATOS DE LA TABLA USERS
		function obtenerDatos (dato) {

			//VARIABLES
			const datos = dato.val()
			const keys = Object.keys(datos)
			var login = `
				<div class="right-section pull-right">
					<a href="/login" class="login-button">${user.email}</a>
					<a id="salir">Salir</a>
				</div> <!-- .right-section -->
			`

			var admin = ``
			var guardar = ``
			var biblioteca = '<li class="menu-item"><a href="/biblioteca">Biblioteca</a></li>'
			var carrito = '<li class="menu-item"><a href="/carrito">Carrito</a></li>'
			const header = document.querySelector('header')

			//CREAMOS EL HTML DEL MENU
			header.innerHTML = menu(login,admin,guardar,biblioteca,carrito)

			//AGREGAMOS EL EVENTO CLICK A SALIR
			var btnSalir = document.querySelector('#salir')
			btnSalir.addEventListener('click', logout)

			//RECORREMOS LOS DATOS OBTENIDOS DE LOS USAURIOS
			for( var i = 0; i <keys.length; i++) {

				//VARIABLES
				const key = keys[i]
				const usuario = datos[key]

				//VERIFICAMOS SI ES ADMINISTRADOR EL USUARIO LOGUEADO
				if (usuario.uid == user.uid && usuario.tipo == "admin") {

					//VARIABLES
					admin = true
					var login = `
						<div class="right-section pull-right">
							<a href="/login" class="login-button cart">${user.email}</a>
							<a id="salir" style = "margin-left:1px">Salir</a>
						</div> <!-- .right-section -->
					`
					var admin = `<li class="menu-item"><a href="/admin">Admin</a></li>`
					var guardar = `<li class="menu-item"><a href="/guardar">Guardar</a></li>`
					var biblioteca = '<li class="menu-item"><a href="/biblioteca">Biblioteca</a></li>'
					var carrito = '<li class="menu-item"><a href="/carrito">Carrito</a></li>'
					const header = document.querySelector('header')

					//CREAMOS EL HTML DEL MENU
					header.innerHTML = menu(login, admin, guardar,biblioteca,carrito)

					//AGREGAMOS EL EVENTO CLICK DE SALIR
					var btnSalir = document.querySelector('#salir')
					btnSalir.addEventListener('click', logout)
				}
			}
		}

		//HACEMOS REFERENCIA A LA TABLA USERS DE BASE DE DATOS
		db.ref('users').once('value').then(obtenerDatos)
	} else {

		//VARIABLES
		var login = `
			<div class="right-section pull-right">
				<a href="/login" class="login-button">Login/Register</a>
			</div> <!-- .right-section -->
		`
		const header = document.querySelector('header')
		var admin = ``
		var guardar = ``
		var biblioteca = ''
		var carrito = ''

		//CREAMOS EL HTML DEL MENU
		header.innerHTML = menu(login,admin,guardar,biblioteca,carrito)
	}

	//FUNCION PARA CREAR EL HTML DEL MENU
	function menu(login,admin,guardar,biblioteca,carrito) {

		//INSERTAMOS LA INFORMACION AL HTML DEL MENU
		const menu = `
			<div class="site-header" >
				<div class="container">
					<a href="/" id="branding">
						<img src="https://firebasestorage.googleapis.com/v0/b/dbgamestore-2ad64.appspot.com/o/iconos%2Flogo.png?alt=media&token=dba002f3-75ca-4e34-afaf-c8c39aad6450" alt="" class="logo">
						<div class="logo-text">
							<h1 class="site-title">GAME HUB</h1>
							<small class="site-description">Todo en juegos</small>
						</div>
					</a> <!-- #branding -->
					${login}
					<div class="main-navigation">
						<button class="toggle-menu"><i class="fa fa-bars"></i></button>
						<ul class="menu">
							<li  class="menu-item home"><a href="/"><img  class = icon-home src="https://firebasestorage.googleapis.com/v0/b/dbgamestore-2ad64.appspot.com/o/iconos%2Ficon-home.png?alt=media&token=1c7db695-de57-46ca-85c5-f9775cf2f583 "></img></a></li>
							<li class="menu-item"><a href="/tienda">Tienda</a></li>
							${biblioteca}
							${carrito}
							<li class="menu-item"><a href="/acercade">Acerca de</a></li>
							${guardar}
							${admin}
						</ul> <!-- .menu -->
					<div class="mobile-navigation">
				</div> <!-- .mobile-navigation -->
				</div> </br></br><!-- .main-navigation -->
				</div>
				</div>
				</div> <!-- .container -->
			</div> <!-- .site-header -->
		`
		return menu
	}

	//FUNCION PARA SALIR DE LA SESION ACTUAL
	function logout (e) {

		e.preventDefault()

		//PROCEDEMOS A SALIR DE LA SESION Y REDIRECCIONAR A HOMEPAGE
		firebase.auth().signOut().then(() => {
			page.redirect('/')
		})
		.catch((error) => {
			console.log(err.message)
		})
	}
});
