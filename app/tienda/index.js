//IMPORT
import firebase from 'firebase'
import config from './../config'

//CONFIGURACION DEL FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

//VARIABLE
const db = firebase.database()

const cargarDatosTienda = () => {

	//OBTENEMOS DATOS DE LOS JUEGOS
	function obtenerDatos (dato) {

		//VARIABLES
		const datos = dato.val()
		const keys = Object.keys(datos)
		var html = ''
		var htmlGame = ''
		var index = ''

		for( var i = 0; i <keys.length; i++) {

			//VARAIBLES
			const key = keys[i]
			const game = datos[key]

			//INSERTAMOS INFORMACION EN HTML
			htmlGame = `
				<div class="product">
				<div class="inner-product">
				<div class="figure-image">
				<img src="${game.url}">
				</div>
				<h3 class="product-title"><a href="/detalle/${key}">${game.nombre}</a></h3>
				<small class="price">Precio: $ ${game.precio}</small>
				</div>

				</div>
			`
			html += htmlGame
		}

		//INSERTAMOS EN EL HTML
		index = `
			<main class="main-content">
			<div class="container">
			<div class="page">
			<section>
			<header>
			<h2 class="section-title">Tienda</h2>
			</header>
			<div class="product-list">
			${html}
			</div>
			</section>
			</div>
			</div>
			</main>
		`

		//OBTENEMOS ETIQUETAS
		const main = document.querySelector('main')
		main.innerHTML = index

	}

	//HACEMOS REFERENCIA A TABLA GAMES
	db.ref('games').once('value').then(obtenerDatos)
}



export default cargarDatosTienda
