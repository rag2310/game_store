import firebase from 'firebase'

import config from './../config'


import layout from './../layout'
//var firebase = require('firebase')
//var config = require('./config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var db = firebase.database()
var html = ''

const cargarDatos = () => {

function obtenerDatos (dato) {
		const datos = dato.val()

		const keys = Object.keys(datos)
		

		for( var i = 0; i <keys.length; i++) {
			const key = keys[i]
			const game = datos[key]

			const htmlGame = `
				<div class="product">
					<div class="inner-product">
						<div class="figure-image">
							<img src="${game.url}">
						</div>
						<h3 class="product-title"><a href="/detalle/${key}">${game.nombre}</a></h3>
					</div>
						<small class="price">$ ${game.precio}</small>
						<p>${game.descripcion}</p>
				</div>
			`
			html += htmlGame
		}

		var index = `
		<main class="main-content">
			<div class="container">
				<div class="page">
					<section>
						<header>
							<h2 class="section-title">Nuevos productos</h2>
							<a href="/" class="all">Ver todos</a>
						</header>
						<div class="product-list">
							${html}
						</div>
					</section>
				</div>
			</div>
		</main> 
		`
		const main = document.querySelector('main')
		main.innerHTML = layout(index)
}

db.ref('games').once('value').then(obtenerDatos)
}

export default cargarDatos
/*
var html = ''
const obtenerDatos= function (datos) {
	var arrayDatos = datos.val()

	var arrayHTML = ''

	for (var i = 0; i < arrayDatos.length; i++) {
		arrayHTML += `
			<li>
				${arrayDatos[i].nombre}
			</li>
		`
		
	}

	return html = `
		<h1>Lista de datos</h1>
		<ul>
			${arrayHTML}
		</ul>`
}

const index = db.ref('games').once('value').then(obtenerDatos)
console.log(db.ref('games').once('value'))
*/
// let j = db.ref('games').once('value').then(obtenerDatos)
// console.log(j)
