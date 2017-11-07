import page from 'page'
import homepage from './homepage'
import acercade from './acercade'
import cargarDatosTienda from './tienda'
import cargarDatos from './biblioteca'
import layout from './layout'
import guardar from './nuevojuego'
import login from './login'

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


page('/login',()=>{
var main = document.querySelector('main')

	main.innerHTML = login
	var btnLogin = document.querySelector('#googleLogin')
  if (btnLogin) btnLogin.addEventListener('click', login)
})
//TEST
page('/guardar',() => {
	const main = document.querySelector('main')
	main.innerHTML = guardar})

//TEST
