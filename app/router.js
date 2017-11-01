import page from 'page'
import homepage from './homepage'
//import contacto from './contactos'
import acercade from './acercade'
import cargarDatosTienda from './tienda'
import cargarDatos from './biblioteca'
import layout from './layout'
import firebase from 'firebase'
import config from './../config'



page('/', () => {
	const main = document.querySelector('main')
	main.innerHTML = homepage
})

page('/acercade', () => {
	const main = document.querySelector('main')
	main.innerHTML = acercade
})

page('/tienda',cargarDatosTienda)

page('/biblioteca',cargarDatos)
