import firebase from 'firebase'

import config from './../config'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var db = firebase.database()


const cargarUsuarios = () => {
	function obtenerDatos (dato) {
		const datos = dato.val()
		const keys = Object.keys(datos)
		var html = ''
		var htmlGame = ''
		var index = ''

			for( var i = 0; i <keys.length; i++) {
				const key = keys[i]
				const game = datos[key]

				console.log(game)
				htmlGame = `

				<tr>
    			<td>${game.email}</td>
    			<td>${game.tipo}</td>
  			</tr>
				`
				html += htmlGame
			}

			index = `
			<table>
				<tr>
					<th style="border: 1px solid black;">Email</th>
					<th style="border: 1px solid black;">Tipo</th>
				</tr>
				${html}
			</table>
			`
			const main = document.querySelector('main')
			main.innerHTML = index


}
db.ref('users').once('value').then(obtenerDatos)
}



export default cargarUsuarios
