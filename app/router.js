import page from 'page'
import homepage from './homepage'
import contacto from './contactos'
import acercade from './acercade'
import busqueda from './busqueda'
//import biblioteca from './biblioteca'
import layout from './layout'
import firebase from 'firebase'
import config from './config'



page('/', () => {
	const main = document.querySelector('main')
	main.innerHTML = layout(homepage)
})

page('/contacto', () => {
	const main = document.querySelector('main')
	main.innerHTML = layout(contacto)
})

page('/acercade', () => {
	const main = document.querySelector('main')
	main.innerHTML = layout(acercade)
})

page('/busqueda', () => {
	const main = document.querySelector('main')
	main.innerHTML = layout(busqueda)
})

page('/biblioteca', () => {
	var main = document.querySelector('main')
	if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}

	var db = firebase.database()

	function obtenerDatos (datos) {
		var arrayDatos = datos.val()
		var main = document.querySelector('main')
		var arrayHTML = ''
		for (var i = 0; i < arrayDatos.length; i++) {
			arrayHTML += `
				<div class="product">
					<div class="inner-product">
						<div class="figure-image">
							<img src="${arrayDatos[i].url}" alt="game 1">
						</div>
						<h3 class="product-title">${arrayDatos[i].nombre}</h3>
					</div>
						<small class="price">$ ${arrayDatos[i].precio}</small>
						<p>${arrayDatos[i].descripcion}</p>
				</div>
			`
		}

		var html = `
		<main class="main-content">
			<div class="container">
				<div class="page">
					<section>
						<header>
							<h2 class="section-title">Nuevos productos</h2>
							<a href="/" class="all">Ver todos</a>
						</header>
						<div class="product-list">
							${arrayHTML}
						</div>
					</section>
				</div>
			</div>
		</main> 
		`

		main.innerHTML = layout(html)
	}
	db.ref('games').once('value').then(obtenerDatos)
	//main.innerHTML = layout(biblioteca)
})

//page('/biblioteca', () => {
//	const main = document.querySelector('main')
//	main.innerHTML = layout(biblioteca)
//})