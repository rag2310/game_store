const page = require('page')
const firebase = require('firebase')

//configuracion de firebase
const config = require('./../config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}

var db = firebase.database()

page('/compra/:codigoGame', (ctx, next) => {
	db.ref('/games/' + ctx.params.codigoGame).once('value').then((snapshot) => {
		let game = snapshot.val()
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
				</div>
			</div> <!-- .container -->`

		const main = document.querySelector('main')
		const title = document.querySelector('title')
		main.innerHTML = html
		title.innerHTML = 'Detalle'

		var carritoBtn = document.querySelector('#comprar')
		carritoBtn.addEventListener('click', comprar)
	})
})

function comprar () {
	let doc = document;
	let descripcion1 = doc.getElementById('comprar').getAttribute('descripcionGame')
	let fecha1 = doc.getElementById('comprar').getAttribute('fecha_altaGame')
	let genero1 = doc.getElementById('comprar').getAttribute('generoGame')
	let id1 = doc.getElementById('comprar').getAttribute('idGame')
	let nombre1 = doc.getElementById('comprar').getAttribute('nombreGame')
	let precio1 = doc.getElementById('comprar').getAttribute('precioGame')
	let url1 = doc.getElementById('comprar').getAttribute('urlGame')

/*	function obtenerDatosUsuarios (dato) {
		const datos = dato.val()
		const keys = Object.keys(datos)

		var yyyy = today.getFullYear();

		var existeGame = false

		for( var i = 0; i <keys.length; i++) {
			const key = keys[i]
			const item = datos[key]
			if (item.keyGame == keyG) {
				console.log("existe")
				existeGame = true
			} 		
		}

		if (existeGame == false) { */
	firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			    var ref = db.ref("biblioteca")
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
			  }
	});
/*		}
	}
	db.ref('carrito').once('value').then(obtenerDatosUsuarios)	*/
/*
page.redirect('/carrito')*/
}
