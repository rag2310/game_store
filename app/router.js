import page from 'page'
import homepage from './homepage'
import acercade from './acercade'
import cargarDatosTienda from './tienda'
import cargarDatos from './biblioteca'
import layout from './layout'
import './nuevojuego'
import './login'
import cargarUsuarios from './admin'
import cargarCarrito from './carrito'


page('/', homepage)

page('/acercade', () => {
	const main = document.querySelector('main')
	main.innerHTML = acercade
})

page('/admin',cargarUsuarios)

page('/carrito', cargarCarrito)

page('/tienda', cargarDatosTienda)

page('/biblioteca',cargarDatos)