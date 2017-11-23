const page = require('page')
const firebase = require('firebase')
const config = require('./../config')
const db = firebase.database()

if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}



page('/detalle/:codigoGame', (ctx, next) => {

	db.ref('/games/' + ctx.params.codigoGame).once('value').then((snapshot) => {

		let game = snapshot.val()

		firebase.auth().onAuthStateChanged(function(user) {

		  if (user) {
		  	function obtenerDatos (dato) {
					const datos = dato.val()
					const keys = Object.keys(datos)
					var admin = false
					var borrarbutton = ''
					var update = ''
						debugger;
					for( var i = 0; i <keys.length; i++) {
					
						const key = keys[i]
						const usuario = datos[key]
						if (usuario.uid == user.uid && usuario.tipo == "admin") {
							admin = true
						}	
					}

					if (admin) {
							borrarbutton = `<h3 class="product-title"><a id="borrar" key="${ctx.params.codigoGame}" class= "button"style = "margin-top:50px">borrar</a></h3>`
					    update = `<h3 class="product-title"><a href="/update/${ctx.params.codigoGame}" style = "margin-top:0px" class="button">update</a></h3>`						
					}

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
															${borrarbutton}
															<h3 class="product-title"><a id="carrito" key="${ctx.params.codigoGame}" nombreGame="${game.nombre}" precioGame="${game.precio}" class= "button"style = "margin-top:50px">Añadir Carrito</a></h3>
															${update}
											</div>
										</div>
									</div>
								</div>
							</div> <!-- .container -->`

							const main = document.querySelector('main')
							const title = document.querySelector('title')
							main.innerHTML = html
							title.innerHTML = 'Detalle'

							var carritoBtn = document.querySelector('#carrito')
							carritoBtn.addEventListener('click', carrito)

							if (admin) {
							var borrarBtn = document.querySelector('#borrar')
							borrarBtn.addEventListener('click', borrar)	
						}
				}
				db.ref('users').once('value').then(obtenerDatos)
		  	console.log(user)
		    
		  } else {
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
							</div>
						</div>
					</div>
				</div> <!-- .container -->`

				const main = document.querySelector('main')
				const title = document.querySelector('title')
				main.innerHTML = html
				title.innerHTML = 'Detalle'
		  }
		});
	})
})

function borrar () {
	let doc = document;
	let key  = doc.getElementById('borrar').getAttribute('key')

	var confirmarBorrado = confirm("¿Esta seguro de Eliminar?")

	if (key!=null && confirmarBorrado == true) {
		var ref = db.ref("games")
		ref.child(key).remove()

		page.redirect('/tienda')
	}
}

function carrito () {
	let doc = document;
	let keyG = doc.getElementById('carrito').getAttribute('key')
	let nombre = doc.getElementById('carrito').getAttribute('nombreGame')
	let precio = doc.getElementById('carrito').getAttribute('precioGame')

	function obtenerDatosUsuarios (dato) {
		const datos = dato.val()
		const keys = Object.keys(datos)
			debugger;
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();

		var existeGame = false
		
		if(dd<10) {
	    dd = '0'+dd
		} 

		if(mm<10) {
	    mm = '0'+mm
		} 

		today = mm + '/' + dd + '/' + yyyy;

		for( var i = 0; i <keys.length; i++) {
			const key = keys[i]
			const item = datos[key]
			if (item.keyGame == keyG) {
				console.log("existe")
				existeGame = true
			} 		
		}

		if (existeGame == false) { 
			firebase.auth().onAuthStateChanged(function(user) {
					  if (user) {
					    var ref = db.ref("carrito")
							ref.push({
								fechaAlta: today,
								nombreGame: nombre,
								precioGame: precio,
								keyGame: keyG,
								uidUser: user.uid
							})
					  }
			});
		}
	}
	db.ref('carrito').once('value').then(obtenerDatosUsuarios)	
	
	page.redirect('/carrito')
}
