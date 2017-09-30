import page from 'page'
import homepage from './homepage'
//import contacto from './contacto'
//import acercade from './acercade'
import layout from './layout'


page('/', () => {
	const main = document.querySelector('main')
	main.innerHTML = layout(homepage)
})

//page('/contacto', () => {
//	const main = document.querySelector('main')
//	main.innerHtml = layout(homepage)
//})

//page('/acercade', () => {
//	const main = document.querySelector('main')
//	main.innerHtml = layout(homepage)
//})

//Falta