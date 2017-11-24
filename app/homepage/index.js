//IMPORT
import firebase from 'firebase'
import config from './../config'

//CONFIGURACION DE LA BASE DE DATOS DE FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

//variables
const db = firebase.database()

const homepage = () => {

	//obtenemos datos de los 3 primeros juegos
	function obtenerDatos (dato) {
		
		//VARIABLES
		const datos = dato.val()
		const main = document.querySelector('main')
		const keys = Object.keys(datos)
		var html = ''
		var htmlGame = ''
		var index = ''

		//recorremos los datos obtenidos
		for( var i = 0; i < keys.length; i++) {

			//VARIABLES
			const key = keys[i]
			const game = datos[key]

			//insertamos informacion al html
			html = `
				<div class="product">
					<div class="inner-product">
						<div class="figure-image">
							<a href="single.html"><img src="${game.url}" alt="juego 1"></a>
						</div>
						<h3 class="product-title"><a href="#">${game.nombre}</a></h3>
					</div>
				</div> <!-- .product -->
			`

			htmlGame += html
		}

		//insertamos el html con los datos ala pagina principal
		main.innerHTML = `
			<div class="home-slider">
				<ul class="slides">
					<li data-bg-image="">
						<div class="container">
						<img src="https://d1z4o56rleaq4j.cloudfront.net/images/assets/Play-Killzone/_heroM/686/Killzone-Shadow-Fall.jpg?mtime=20160414075949" class="slide-image">
						</div>
					</li>
				</ul> <!-- .slides -->
			</div> <!-- .home-slider -->
			<div class="container">
					<div class="page">
						<section>
							<header>
								<h2 class="section-title"><a href ="/tienda">Videojuegos</a></h2>
							</header>
							<div class="product-list">
								${htmlGame}
							</div> <!-- .product-list -->
						</section>
					</div>
			</div> <!-- .container -->
		`	
	}
//HACEMOS REFERENCIA A LA TABLA BIBLIOTECA DE LA BD
db.ref('games').once('value').then(obtenerDatos)
}

export default homepage
