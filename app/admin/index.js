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
	    						<td style= "text-align:center">${usuario.email}</td>
	    						<td style= "text-align:center">${usuario.tipo}</td>
	    						<td style= "text-align:center">
	    							<a href="/usuario/${key}" class="button" >Actualizar</a>
	  							</td>
	  						</tr>`
							html += htmlUser
						}

						index = `

						<div class="container">
							<div class="page">

								<table class="cart">
									<thead>
										<tr>
										<th class="product-name" style ="text-align:center">Email</th>
										<th class="product-price">Tipo</th>
										<th class="product-qty">Fecha</th>

										</tr>
									</thead>
									<tbody style = "border-spacing: 0px 20px">
										${html}
									</tbody>
								</table> <!-- .cart -->
							</div>
						</div> <!-- .container -->

							`

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
