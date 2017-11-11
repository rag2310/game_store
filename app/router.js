import page from 'page'
import homepage from './homepage'
import acercade from './acercade'
import cargarDatosTienda from './tienda'
import cargarDatos from './biblioteca'
import layout from './layout'
import './nuevojuego'
import './login'

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

page('/biblioteca',cargarDatos)


//test

import config from './../config'
import firebase from 'firebase'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var form = `
<div>
<form>
	<label>email</label>
	<input type="email" name="email" id="email">
	<label>Password</label>
	<input type="password" name="psw" id="password">
	<a id="loginEmail">Login con EMAIL</a>
</form>
</div>`

page('/correo', () => {
	const main = document.querySelector('main')
	main.innerHTML = form
	var guardarBtn = document.querySelector('#loginEmail')
	guardarBtn.addEventListener('click', test)
})

function test () {
	console.log(document.querySelector('#email').value)
	console.log(document.querySelector('#password').value)
	var email = document.querySelector('#email').value
	var pass = document.querySelector('#password').value

	firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
	})
}
//test
