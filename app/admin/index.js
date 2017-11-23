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
	    					<td>${usuario.email}</td>
	    					<td>${usuario.tipo}</td>
	    					<td>
	    						<a href="/usuario/${key}">Update</a>
	  						</td>
	  					</tr>
	  				`

	  				//INSERTAMOS EL HTML DE LA LISTA DE USUARIOS AL HTML PRINCIPAL
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
						</table>
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