const page = require('page')
const firebase = require('firebase')

//configuracion de firebase
const config = require('./../config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}

var db = firebase.database()
//

page('/detalle/:codigoGame', (ctx, next) => {
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
						<div class="addtocart-bar col-sm-2" style = " text-align;center">
										<h3 class="product-title"><a id="borrar" key="${ctx.params.codigoGame}" style = "margin-top:1px">borrar</a></h3>
									</div>
					</div>
				</div>
			</div>
		</div> <!-- .container -->


		`

		const main = document.querySelector('main')
		debugger;
		main.innerHTML = html

		var borrarBtn = document.querySelector('#borrar')
		borrarBtn.addEventListener('click', borrar)
	})
})


function borrar () {
	let doc = document;
	let key  = doc.getElementById('borrar').getAttribute('key')

	var confirmarBorrado = confirm("prueba")

	console.log(confirmarBorrado)

	if (key!=null && confirmarBorrado == true) {
		var ref = db.ref("games")
		ref.child(key).remove()

		page.redirect('/tienda')
	}
}
