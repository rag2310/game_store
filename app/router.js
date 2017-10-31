import page from 'page'
import homepage from './homepage'
import contacto from './contactos'
import acercade from './acercade'
import busqueda from './busqueda'
import cargarDatos from './biblioteca'
import layout from './layout'
import firebase from 'firebase'
import config from './../config'



page('/', () => {
	const main = document.querySelector('main')
	main.innerHTML = homepage
})

page('/contacto', () => {
	const main = document.querySelector('main')
	main.innerHTML = contacto 
})

page('/acercade', () => {
	const main = document.querySelector('main')
	main.innerHTML = acercade 
})

page('/busqueda', () => {
	const main = document.querySelector('main')
	main.innerHTML = busqueda 
})

page('/biblioteca',cargarDatos)