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

	//COMPROBAMOS QUE SI ESTE LOGUEADO EL USUARIO
	firebase.auth().onAuthStateChanged(function(user) {

		//OBTENEMOS LA INFORMACION DEL USUARIO LOGUEADO
		if (user) {

			//OBTENEMOS DATOS DE BIBLIOTECA
			function obtenerDatosBiblioteca (dato) {

				//VARIABLES
				const datosbi = dato.val()
				const keysbi = Object.keys(datosbi)

				//OBTENEMOS LOS DATOS DE LA TABLA CARRITO
				function obtenerDatosCarrito (dato) {

					//VARIABLES
					const datos = dato.val()
					const keys = Object.keys(datos)
					var html = ''
					var htmlCarrito = ''
					var index = ''
					var existe = false

					//RECORREMOS LOS DATOS OBTENIDOS DE LA TABLA CARRITO
					for( var i = 0; i <keys.length; i++) {

						//VARIABLES
						const key = keys[i]
						const item = datos[key]
						existe = false

						//RECORREMOS LOS DATOS DE BIBLIOTECA
						for( var x = 0; x <keysbi.length; x++) {

							//VARIABLES
							const keybi = keysbi[x]
							const itembi = datosbi[keybi]

							//VALIDAMOS QUE EL USAURIO NO TENGA ESE JUEGO EN SU BIBLIOTECA PARA QUE NO APAREZCA EN EL CARRITO
							if (itembi.keyG == item.keyGame) {
								existe= true
							}
						}

						//validamos que solo los JUEGOS DEL USUARIO SE CARGUEN AL HTML
						if (user.uid == item.uidUser && existe == false) {

							//REINICIAMOS A EXISTE
							existe = false

							//INSERTAMOS INFORMACION DE LOS JUEGOS AL HTML
							htmlCarrito = `
								<tr>
									<td  class="product-name">
										<div class="product-detail">

										<div class="product-thumbnail" style ="text-align:center">
											<a href="${item.urlGame}">
												<img src="${item.urlGame}" height="150" width="250">
											</a>
										</div>
										</div>
										</td>
										<td   class="product-price" style ="text-align:center">
										<h3 class="product-title" style = "margin: 31px">
										${item.nombreGame}
										</h3>
										</td>
										<td  class="product-price" style ="text-align:center"  style = "margin: 31px">$${item.precioGame}</td>
										<td  class="product-price" style ="text-align:center"  style = "margin: 31px">${item.fechaAlta}</td>
										<td style ="text-align:center">
										<a href="/compra/${item.keyGame}" class= "button product-price"style = "margin:31px;margin-right:0px; text-align: center;">Comprar</a>
										<a id="borrar" key="${key}"  class= "button product-price" style = " text-align: center; background-color: red;">borrar</a>
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
						<table class="cart" style = "border-spacing: 0px 20px">
						<thead>
						<tr>
						<th class="product-name" style ="text-align:center">Caratula</th>
						<th class="product-name" style ="text-align:center">Juego</th>
						<th class="product-name" style ="text-align:center">Precio</th>
						<th class="product-name" style ="text-align:center">Fecha</th>
						<th class="product-name" style ="text-align:center">Opciones</th>
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


					var borrarBtn = document.querySelector('#borrar')
					borrarBtn.addEventListener('click', borrar)
				}

				//HACEMOS REFERENCIA A LA TABLA DE CARRITO PARA OBTENER INFORMACION
				db.ref('carrito').once('value').then(obtenerDatosCarrito)

				function borrar () {

					//VARIABLES
					let doc = document;
					let key  = doc.getElementById('borrar').getAttribute('key')

					//CONFIRMAMOS CON EL USUARIO SI DESEA BORRAR
					var confirmarBorrado = confirm("¿Esta seguro de Eliminar?")

					//VERIFICAMOS LA RESPUESTA DEL USUARIO CON EL TEMA DEL BORRADO
					if (key!=null && confirmarBorrado == true) {

						//HACEMOS REFERENCIA A LA TABLA GAMES
						var ref = db.ref("carrito")

						//PROCEDEMOS A BORRAR
						ref.child(key).remove()

						//REDIRECCIONAMOS A TIENDA
						page.redirect('/carrito')
					}
				}

			}

			//HACEMOS REFERENCIA A LA TABLA BIBLIOTECA DE LA BD
			db.ref('biblioteca').once('value').then(obtenerDatosBiblioteca)
		} else {

		//REDIRECCIONAMOS A HOMEPAGE
		page.redirect('/')
		}
	});
}

//EXPORTAMOS
export default cargarCarrito
