//IMPORT
import firebase from 'firebase'
import config from './../config'
import page from 'page'

//VARIBALES
const db = firebase.database()

//CONFIGURACION DE LA BASE DE DATOS DE FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

//Ruta de el detalle con el key del juego
page('/detalle/:codigoGame', (ctx, next) => {

	//REFERENCIA DEL REGISTRO ESPECIFICO
	db.ref('/games/' + ctx.params.codigoGame).once('value').then((snapshot) => {

		//VARIABLES
		let game = snapshot.val()

		//OBTENEMOS AL USUARIO LOGUEDO
		firebase.auth().onAuthStateChanged(function(user) {

			//VERIFICAMOS QUE EL USUARIO ESTE  LOGUEADO
			if (user) {

				//OBTENEMOS LOS DATOS DE LOS USUARIOS EXISTENTES
				function obtenerDatos (dato) {

					//VARIABLES
					const datos = dato.val()
					const keys = Object.keys(datos)
					var admin = false
					var borrarbutton = ''
					var update = ''

					//RECORREMOS LOS DATOS OBTENIDOS
					for( var i = 0; i <keys.length; i++) {

						//VARIABLES
						const key = keys[i]
						const usuario = datos[key]

						//VARIFICAMOS QUE EL USUARIO LOGUEADO SEA ADMINISTRADOR
						if (usuario.uid == user.uid && usuario.tipo == "admin") {
							admin = true
						}	
					}

					//SI ADMINISTRADOR SE HABILITAN LOS BATONES DE BORRAR Y ACTUALIZAR DE LOS JUEGOS EXPECIFICOS
					if (admin) {
						borrarbutton = `<h3 class="product-title"><a id="borrar" key="${ctx.params.codigoGame}" class= "button"style = "margin-top:50px; background-color: red;">borrar</a></h3>`
						update = `<h3 class="product-title"><a href="/update/${ctx.params.codigoGame}" style = "margin-top:0px" class="button">update</a></h3>`						
					}

					//INSERTAMOS INFORMACION EN EL HTML
					let html = `
						<div class="container">
							<div class="page">
								<div class="entry-content">
									<div class="row">
										<div class="col-sm-6 col-md-4">
											<div class="product-images">
												<figure class="large-image">
													<a href=""><img src="${game.url}"></a>
												</figure>
											</div>
										</div>
										<div class="col-sm-6 col-md-8">
											<h2 class="entry-title">${game.nombre}</h2>
											<small class="price"> $ ${game.precio}</small>
											<p Style= "text-align: justify">${game.descripcion}</p>
										</div>
									</div>
									<div class="addtocart-bar" class="col-md-12" style = "text-align:center" >
										${borrarbutton}
										<h3 class="product-title"><a id="carrito" key="${ctx.params.codigoGame}" nombreGame="${game.nombre}" precioGame="${game.precio}" urlGame="${game.url}"class= "button"style = "margin-top:50px">Añadir Carrito</a></h3>
										${update}
									</div>
								</div>
							</div>
						</div> <!-- .container -->
					`

					//OBTENEMOS ETIQUETAS ESPECIFICAS DEL HTML PARA INSERTAR 
					const main = document.querySelector('main')
					const title = document.querySelector('title')
					main.innerHTML = html
					title.innerHTML = 'Detalle'

					//Agregamos un evento click al boton del carrito
					var carritoBtn = document.querySelector('#carrito')
					carritoBtn.addEventListener('click', carrito)

					//VERIFICAMOS QUE EL USUARIO SEA ADMIN
					if (admin) {

						//AGREGAMOS UN EVENTO CLICK AL BOTON DE BORRAR
						var borrarBtn = document.querySelector('#borrar')
						borrarBtn.addEventListener('click', borrar)	
					}
				}

				//HACEMOS REFERENCIA A LA TABLA USUARIO
				db.ref('users').once('value').then(obtenerDatos)
			} else {

					//INSERTAMOS EN HTML
				let html = `
					<div class="container">
						<div class="page">
							<div class="entry-content">
								<div class="row">
									<div class="col-sm-6 col-md-4">
										<div class="product-images">
											<figure class="large-image">
												<a href=""><img src="${game.url}"></a>
											</figure>
										</div>
									</div>
									<div class="col-sm-6 col-md-8">
										<h2 class="entry-title">${game.nombre}</h2>
										<small class="price"> $ ${game.precio}</small>
										<p Style= "text-align: justify">${game.descripcion}</p>
									</div>
								</div>
							</div>
						</div>
					</div> <!-- .container -->
				`

				//OBTENEMOS LAS ETIQUETAS DEL HTML
				const main = document.querySelector('main')
				const title = document.querySelector('title')
				main.innerHTML = html
				title.innerHTML = 'Detalle'
			}
		});
	})
})


//BORRAR JUEGO
function borrar () {

	//VARIABLES
	let doc = document;
	let key  = doc.getElementById('borrar').getAttribute('key')

	//CONFIRMAMOS CON EL USUARIO SI DESEA BORRAR
	var confirmarBorrado = confirm("¿Esta seguro de Eliminar?")

	//VERIFICAMOS LA RESPUESTA DEL USUARIO CON EL TEMA DEL BORRADO
	if (key!=null && confirmarBorrado == true) {
		
		//HACEMOS REFERENCIA A LA TABLA GAMES
		var ref = db.ref("games")

		//PROCEDEMOS A BORRAR
		ref.child(key).remove()

		//REDIRECCIONAMOS A TIENDA
		page.redirect('/tienda')
	}
}

//AGREGAR A CARRITO
function carrito () {

	//VARIABLES
	let doc = document;
	let keyG = doc.getElementById('carrito').getAttribute('key')
	let nombre = doc.getElementById('carrito').getAttribute('nombreGame')
	let precio = doc.getElementById('carrito').getAttribute('precioGame')
	let url = doc.getElementById('carrito').getAttribute('urlGame')

	//OBTENEMOS LOS DATOS DE LOS USUARIOS
	function obtenerDatosUsuarios (dato) {

		//VARIABLES
		const datos = dato.val()
		const keys = Object.keys(datos)
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		var existeGame = false

		//OBTENEMOS LAS FECHAS
		if(dd<10) {
			dd = '0'+dd
		} 

		if(mm<10) {
			mm = '0'+mm
		} 

		today = mm + '/' + dd + '/' + yyyy;

		//OBTENEMOS INFORMACION DEL USUARIO LOGUEADO
		firebase.auth().onAuthStateChanged(function(user) {

			//VERIFICAMOS SI EL USUARIO ESTA LOGUEADO
			if (user) {

				//recorremos LOS DATOS OBTENIDOS
				for( var i = 0; i <keys.length; i++) {

					//VARIABLES
					const key = keys[i]
					const item = datos[key]

					//VERIFICAMOS QUE EL JUEGO NO SE ENCUENTRE EN EL CARRITO Y NO SE DUPLIQUE
					if (item.keyGame == keyG && item.uidUser == user.uid) {
						existeGame = true
					} 		
				}

				//SI EL JUEGO NO ESTA EN EL CARRITO SE PROCEDE A AGREGARLO
				if (existeGame == false) { 
					
					//HACEMOS REFERENCIA A LA TABLA CARRITO 
					var ref = db.ref("carrito")

					//PROCEDEMOS A INSERTAR
					ref.push({
						fechaAlta: today,
						nombreGame: nombre,
						precioGame: precio,
						keyGame: keyG,
						uidUser: user.uid,
						urlGame: url
					})
				}
			}
		});
	}

	//hacemos REFERENCIA A LA TABLA CARRITO
	db.ref('carrito').once('value').then(obtenerDatosUsuarios)	

	//REDIRECCIONAMOS A CARRITO
	page.redirect('/carrito')
}
