import firebase from 'firebase'

import config from './../config'

import page from 'page'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var db = firebase.database()

const cargarUsuarios = () => {
	function obtenerDatos (dato) {
		const datos = dato.val()
		const keys = Object.keys(datos)
		var html = ''
		var htmlUser = ''
		var index = ''

		firebase.auth().onAuthStateChanged(function(user) {
	  	if (user) {
	  		function obtenerDatosUsuarios (dato) {
					const datos = dato.val()
					const keys = Object.keys(datos)

					var admin = false

					for( var i = 0; i <keys.length; i++) {
						const key = keys[i]
						const usuario = datos[key]
						if (usuario.uid == user.uid && usuario.tipo == "admin") {
							admin = true
						}	
					}

					if (admin == false) {
						page.redirect('/')
					} else {
						for( var i = 0; i <keys.length; i++) {
							const key = keys[i]
							const usuario = datos[key]
							htmlUser = `
								<tr>
	    						<td>${usuario.email}</td>
	    						<td>${usuario.tipo}</td>
	    						<td>
	    							<a href="/usuario/${key}">Update</a>
	  							</td>
	  						</tr>`
							html += htmlUser
						}

						index = `
							<table>
								<tr>
									<th style="border: 1px solid black;">Email</th>
									<th style="border: 1px solid black;">Tipo</th>
									<th style="border: 1px solid black;">Opciones</th>
								</tr>
								${html}
							</table>`
						
						const main = document.querySelector('main')
						main.innerHTML = index
					}
				}
				db.ref('users').once('value').then(obtenerDatosUsuarios)
	  	} else {
	  		page.redirect('/')
	  	}
		});
}
	db.ref('users').once('value').then(obtenerDatos)
}

export default cargarUsuarios