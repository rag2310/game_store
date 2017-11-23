//IMPORT
import firebase from 'firebase'
import page from 'page'
import config from './../config'

//VARIABLES
const db = firebase.database()

//CONFIGURACION DE LA BASE DE DATOS DE FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

const cargarDatos = () => {

	//OBTENEMOS DATOS DE LA TABLA DE BIBLIOTECAS DE LA BD 
	function obtenerDatos (dato) {
		
		//VARIABLES
		const datos = dato.val()
		const main = document.querySelector('main')
		const keys = Object.keys(datos)
		var html = ''
		var htmlGame = ''
		var index = ''

		//OBTENEMOS EL USUARIO ACTUALMENTE LOGUEADO
		firebase.auth().onAuthStateChanged(function(user) {

			//COMPROBAMOS QUE EL USUARIO ESTE LOGUEADO
			if (user) {

				//RECORREMOS LOS DATOS OBTENIDOS DE LA BD
				for( var i = 0; i <keys.length; i++) {

					//VARIABLES
					const key = keys[i]
					const game = datos[key]

					//VALIDAMOS QUE SOLO SE MUESTREN LOS JUEGOS QUE EL USUARIO HA COMPRADO
					if (user.uid == game.uidUser) {

						//INSERTAMOS LA INFORMACION EN EL HTML CON LOS JUEGOS
						htmlGame = `
							<div class="product">
								<div class="inner-product">
									<div class="figure-image">
										<img src="${game.url}">
									</div>
									<h3 class="product-title">
										<a href="/detalleBiblioteca/${key}">${game.nombre}</a>
									</h3>
									<small class="price"> Precio: $ ${game.precio}</small>
								</div>
							</div>
						`
						//INSERTAMOS EL HTML CON LA INFORMACION DE LOS JUEGOS AL HTML PRINCIPAL
						html += htmlGame
					}
				}

				//INSERTAMOS EL HTML PRINCIPAL A EL CUERPO DE LA PAGINA
				index = `
					<main class="main-content">
						<div class="container">
							<div class="page">
								<section>
									<header>
										<h2 class="section-title">Mi Biblioteca</h2>
									</header>
									<div class="product-list">
										${html}
									</div>
								</section>
							</div>
						</div>
					</main>
				`

				main.innerHTML = index
			} else {

				//REDIRECCIONAMOS A HOMEPAGE
				page.redirect('/')
			}
		});			
	}

//HACEMOS REFERENCIA A LA TABLA BIBLIOTECA DE LA BD
db.ref('biblioteca').once('value').then(obtenerDatos)
}

//EXPORTAMOS LA FUNCION 
export default cargarDatos
