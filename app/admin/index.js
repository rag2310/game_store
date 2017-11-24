//IMPORT
import firebase from 'firebase'
import config from './../config'
import page from 'page'

//VARIABLES
const db = firebase.database()

//CONFIGURACION DE LA BASE DE DATOS DE FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

const cargarUsuarios = () => {

	//Variables
	var html = ''
	var htmlUser = ''
	var index = ''

	//Obtenemos al USUARIO ACTUALMENTE LOGUEADO
	firebase.auth().onAuthStateChanged(function(user) {

		//COMPROBAMOS QUE EXISTA UN USUARIO LOGUEADO
	 	if (user) {

  		//OBTENEMOS LOS DATOS DE LOS USUARIOS DE LA BD
  		function obtenerDatosUsuarios (dato) {

  			//VARIABLES
			const datos = dato.val()
			const keys = Object.keys(datos)
			var admin = false

			//RECORREMOS EL OBJECT  DE LOS USUARIOS
			for( var i = 0; i <keys.length; i++) {

				//VARIABLES
				const key = keys[i]
				const usuario = datos[key]

				//COMPROBAMOS SI EL USUARIO ACTUAL ES ADMINISTRADOR
				if (usuario.uid == user.uid && usuario.tipo == "admin") {
					admin = true
				}
			}

			//SI EL USUARIO NO ES ADMINISTRADOR SE REDIRECCIONA A HOMEPAGE
			//EN CASO CONTRARIO SE INSERTA LA TABLA CON LOS USUARIOS
			if (admin == false) {

				//REDIRECCIONAMOS A HOMEPAGE
				page.redirect('/')
			} else {

				//RECORREMOS EL OBJECT DE LOS USUARIOS
				for( var i = 0; i <keys.length; i++) {

					//VARIABLES
					const key = keys[i]
					const usuario = datos[key]

					//INSERTAMOS LOS USUARIOS AL HTML
					htmlUser = `
						<tr>
    						<td style= "text-align:center">${usuario.email}</td>
    						<td style= "text-align:center">${usuario.tipo}</td>
    						<td style= "text-align:center">
    							<a href="/usuario/${key}" class="button" >Actualizar</a>
  							</td>
  						</tr>
  					`

  				//INSERTAMOS EL HTML DE LA LISTA DE USUARIOS AL HTML PRINCIPAL
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
									<th class="product-qty">Opcion</th>

									</tr>
								</thead>
								<tbody style = "border-spacing: 0px 20px">
									${html}
								</tbody>
							</table> <!-- .cart -->
						</div>
					</div> <!-- .container -->
				`
				//INSERTAMOS EL HTML A EL MAIN DE LA PAGINA
				const main = document.querySelector('main')
				main.innerHTML = index
			}
		}

		//HACEMOS REFERENCIA A LA TABLA USERS DE LA BASE DE DATOS PARA OBTENER LOS DATOS DE LOS USUARIOS
		db.ref('users').once('value').then(obtenerDatosUsuarios)
	  } else {

	  	//REDIRECCIONAMOS A HOMEPAGE
	  	page.redirect('/')
	  }
	});
}

export default cargarUsuarios
