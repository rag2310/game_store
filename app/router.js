import page from 'page'
import homepage from './homepage'
import acercade from './acercade'
import cargarDatosTienda from './tienda'
import cargarDatos from './biblioteca'
import layout from './layout'
import guardar from './nuevojuego'

//TEST
import config from './../config'
import firebase from 'firebase'
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}
//TEST

page('/', () => {
	const main = document.querySelector('main')
	main.innerHTML = homepage
})

page('/acercade', () => {
	const main = document.querySelector('main')
	main.innerHTML = acercade
})

page('/tienda', cargarDatosTienda)

page('/biblioteca',cargarDatos)

//TEST
page('/guardar',() => { 
	const main = document.querySelector('main')
	main.innerHTML = guardar})

//TEST
