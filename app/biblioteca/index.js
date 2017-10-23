import firebase from 'firebase'

import config from './config'

//var firebase = require('firebase')
//var config = require('./config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var db = firebase.database()

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

// let j = db.ref('games').once('value').then(obtenerDatos)
// console.log(j)
export default index