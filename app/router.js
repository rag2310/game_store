import page from 'page'
import homepage from './homepage'
import contacto from './contactos'
import acercade from './acercade'
//import busqueda from './busqueda'
//import biblioteca from './biblioteca'
import layout from './layout'


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

//page('/busqueda', () => {
//	const main = document.querySelector('main')
//	main.innerHTML = layout(busqueda)
//})

//page('/biblioteca', () => {
//	const main = document.querySelector('main')
//	main.innerHTML = layout(biblioteca)
//})