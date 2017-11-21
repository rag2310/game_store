import firebase from 'firebase'

import config from './../config'

import page from 'page'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var db = firebase.database()

const cargarCarrito = () => {
		firebase.auth().onAuthStateChanged(function(user) {
	  	if (user) {
	  		function obtenerDatosUsuarios (dato) {
					const datos = dato.val()
					const keys = Object.keys(datos)
					var html = ''
					var htmlCarrito = ''
					var index = ''

					for( var i = 0; i <keys.length; i++) {
							const key = keys[i]
							const item = datos[key]
							if (user.uid == item.uidUser) {
								htmlCarrito = `
									<tr>
		    						<td>${item.nombreGame}</td>
		    						<td>${item.precioGame}</td>
		    						<td>${item.fechaAlta}</td>
		    						<td>
		    							<a href="/compra/${item.keyGame}" class= "button"style = "margin-top:50px">Comprar</a>
		  							</td>
		  						</tr>`
								html += htmlCarrito
								}
						}

						index = `
							<table>
								<tr>
									<th style="border: 1px solid black;">Juego</th>
									<th style="border: 1px solid black;">Precio</th>
									<th style="border: 1px solid black;">Fecha</th>
									<th style="border: 1px solid black;">Opciones</th>
								</tr>
								${html}
							</table>`
						
						const main = document.querySelector('main')
						main.innerHTML = index
				}
				db.ref('carrito').once('value').then(obtenerDatosUsuarios)
	  	} else {
	  		page.redirect('/')
	  	}
		});
}

export default cargarCarrito