//IMPORT
import firebase from 'firebase'
import config from './../config'
import page from 'page'

const db = firebase.database()

//CONFIGURACION DE LA BASE DE DATOS DE FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

const cargarCarrito = () => {

	//OBTENEMOS LA INFORMACION DEL USUARIO LOGUEADO
	firebase.auth().onAuthStateChanged(function(user) {

		//COMPROBAMOS QUE SI ESTE LOGUEADO EL USUARIO
		if (user) {

			//OBTENEMOS LOS DATOS DE LA TABLA CARRITO
			function obtenerDatosCarrito (dato) {

				//VARIABLES
				const datos = dato.val()
				const keys = Object.keys(datos)
				var html = ''
				var htmlCarrito = ''
				var index = ''

				//RECORREMOS LOS DATOS OBTENIDOS DE LA TABLA CARRITO
				for( var i = 0; i <keys.length; i++) {

					//VARIABLES
					const key = keys[i]
					const item = datos[key]

					//validamos que solo los JUEGOS DEL USUARIO SE CARGUEN AL HTML
					if (user.uid == item.uidUser) {

						//INSERTAMOS INFORMACION DE LOS JUEGOS AL HTML
						htmlCarrito = `
							<tr>

								<td  class="product-name">
									<div class="product-detail">

									<div class="product-thumbnail">
										<img src="${item.urlGame}" height="150" width="150">
									</div>
										<h3 class="product-title">
											${item.nombreGame}
										</h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure nobis architecto dolorum, alias laborum sit odit, saepe expedita similique eius enim quasi obcaecati voluptates, autem eveniet ratione veniam omnis modi.</p>
									</div>
								</td>
								<td  class="product-price">$${item.precioGame}</td>
								<td  class="product-price">${item.fechaAlta}</td>
								<td>
									<a href="/compra/${item.keyGame}" class= "button product-price"style = "margin-top:10px; text-align: center;">Comprar</a>
								</td>
							</tr>
						`
						//INSERTAMOS TODA LA LISTA DE LOS JUEGOS AL HTML
						html += htmlCarrito
					}
				}

				//INSERTAMOS EL HTML CON LA INFORMACION
				index = `
				<div class="container">
					<div class="page">
						<table class="cart">
							<thead>
								<tr>

									<th class="product-name">Juego</th>
									<th class="product-name">Precio</th>
									<th class="product-name">Fecha</th>
									<th class="product-name">Opciones</th>
								</tr>
							</thead>
							<tbody>
								${html}
							</tbody>
						</table>
					</div>
				</div>
				`

				//OBTENEMOS EL MAIN DE LA PAGINA PRINCIPAL PARA INSERTAR EL HTML
				const main = document.querySelector('main')
				main.innerHTML = index
			}

			//HACEMOS REFERENCIA A LA TABLA DE CARRITO PARA OBTENER INFORMACION
			db.ref('carrito').once('value').then(obtenerDatosCarrito)
		} else {

			//REDIRECCIONAMOS A HOMEPAGE
			page.redirect('/')
		}
	});
}

//EXPORTAMOS
export default cargarCarrito
