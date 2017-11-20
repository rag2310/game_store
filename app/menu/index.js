import page from 'page'

import firebase from 'firebase'

import config from './../config'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var db = firebase.database()

var admin = false

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	function obtenerDatos (dato) {
			const datos = dato.val()
			const keys = Object.keys(datos)
			var login = `
				<div class="right-section pull-right">
					<a href="/login" class="login-button">${user.email}</a>
					<a id="salir">Salir</a>
				</div> <!-- .right-section -->`

			var admin = ``
			var guardar = ``
			var biblioteca = '<li class="menu-item"><a href="/biblioteca">Biblioteca</a></li>'
			const header = document.querySelector('header')
			header.innerHTML = menu(login,admin,guardar,biblioteca)
			var btnSalir = document.querySelector('#salir')
			btnSalir.addEventListener('click', logout)

			for( var i = 0; i <keys.length; i++) {
				const key = keys[i]
				const usuario = datos[key]
				if (usuario.uid == user.uid && usuario.tipo == "admin") {
					admin = true
					var login = `
						<div class="right-section pull-right">
							<a href="/login" class="login-button">${user.email}</a>
							<a id="salir">Salir</a>
						</div> <!-- .right-section -->`
					var admin = `<li class="menu-item"><a href="/admin">Admin</a></li>`
					var guardar = `<li class="menu-item"><a href="/guardar">Guardar</a></li>`
					var biblioteca = '<li class="menu-item"><a href="/biblioteca">Biblioteca</a></li>'
					const header = document.querySelector('header')
					header.innerHTML = menu(login, admin, guardar,biblioteca)
					var btnSalir = document.querySelector('#salir')
					btnSalir.addEventListener('click', logout)
				}	
			}
		}
		db.ref('users').once('value').then(obtenerDatos)
  } else {
    var login = `
    	<div class="right-section pull-right">
				<a href="/login" class="login-button">Login/Register</a>
			</div> <!-- .right-section -->`
		const header = document.querySelector('header')
		var admin = ``
		var guardar = ``
		var biblioteca = ''
		header.innerHTML = menu(login,admin,guardar,biblioteca)
  }

  function menu(login,admin,guardar,biblioteca) {
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

  function logout (e) {
		e.preventDefault()

		firebase.auth().signOut().then(() => {
			page.redirect('/')
		})
		.catch((error) => {
			console.log(err.message)
		})
	}
});

