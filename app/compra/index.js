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


page('/compra/:codigoGame', (ctx, next) => {

	//BUSCAMOS EL REGISTRO ESPECIFICO 
	db.ref('/games/' + ctx.params.codigoGame).once('value').then((snapshot) => {

		//VARIABLES
		let game = snapshot.val()

		//INSERTAMOS INFORMACION DE LOS JUEGOS EN EL HTML
		let html = `
			<div class="container">
				<div class="page">
					<div class="entry-content">
						<div class="row">
							<div class="col-sm-6 col-md-4">
								<div class="product-images">
									<figure class="large-image">
									<a href=""><img src="${game.url}"></a>
									</figure>
								</div>
							</div>
							<div class="col-sm-6 col-md-8">
									<h2 class="entry-title">${game.nombre}</h2>
									<small class="price"> $ ${game.precio}</small>
									<p Style= "text-align: justify">${game.descripcion}</p>
							</div>
						</div>
						<div class="addtocart-bar" class="col-md-12" style = "text-align:center" >
							<h3 class="product-title"><a id="comprar" 
							descripcionGame="${game.descripcion}"
							fecha_altaGame="${game.fecha_alta}"
							generoGame="${game.genero}"
							idGame="${game.id}"
							nombreGame="${game.nombre}" 
							precioGame="${game.precio}" 
							urlGame="${game.url}"
							class= "button"style = "margin-top:50px">Comprar</a></h3>
						</div>
					</div>
				</div>
			</div> <!-- .container -->
		`

		//INSERTAMOS EL HTML A EL MAIN 
		const main = document.querySelector('main')
		const title = document.querySelector('title')
		main.innerHTML = html
		title.innerHTML = 'Detalle'

		//ASIGNAMOD UN LISTENER PARA EL EVENTO CLICK EN EL BOTON DE COMPRA
		var carritoBtn = document.querySelector('#comprar')
		carritoBtn.addEventListener('click', comprar)
	})
})

//FUNCION COMPRA LA CUAL GUARDA LA INFORMACION DEL JUEGO EN LA BIBLIOTECA DE EL USUARIO
function comprar () {

	//VARIABLES
	let doc = document;
	let descripcion1 = doc.getElementById('comprar').getAttribute('descripcionGame')
	let fecha1 = doc.getElementById('comprar').getAttribute('fecha_altaGame')
	let genero1 = doc.getElementById('comprar').getAttribute('generoGame')
	let id1 = doc.getElementById('comprar').getAttribute('idGame')
	let nombre1 = doc.getElementById('comprar').getAttribute('nombreGame')
	let precio1 = doc.getElementById('comprar').getAttribute('precioGame')
	let url1 = doc.getElementById('comprar').getAttribute('urlGame')

	//OBTENEMOS LA INFORMACION DEL USUARIO
	firebase.auth().onAuthStateChanged(function(user) {

		//VALIDAMOS SI HAY USUARIO LOGUADO
		if (user) {

			//VARIABLES
			var ref = db.ref("biblioteca")

			//CREAMOS UN REGISTRO EN LA BASE DE DATOS EN LA TABLA BIBLIOTECA
			ref.push({
				descripcion: descripcion1,
				fecha_alta: fecha1,
				genero: genero1,
				id: id1,								
				nombre: nombre1,
				precio: precio1,
				uidUser: user.uid,
				url: url1
			})

			page.redirect('/biblioteca')
		}
	});
}
