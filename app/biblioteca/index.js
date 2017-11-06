import firebase from 'firebase'

import config from './../config'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var db = firebase.database()


const cargarDatos = () => {

function obtenerDatos (dato) {
		const datos = dato.val()
		const main = document.querySelector('main')
		const keys = Object.keys(datos)
		main.innerHTML = ''
		var html = ''
		var htmlGame = ''
		var index = ''

		for( var i = 0; i <keys.length; i++) {
			const key = keys[i]
			const game = datos[key]

			htmlGame = `
				<div class="product">
					<div class="inner-product">
						<div class="figure-image">
							<img src="${game.url}">
						</div>
						<h3 class="product-title"><a href="/detalle/${key}">${game.nombre}</a></h3>
						<small class="price"> Precio: $ ${game.precio}</small>
					</div>

				</div>
			`
			html += htmlGame
		}

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
}

db.ref('games').once('value').then(obtenerDatos)
}

export default cargarDatos
