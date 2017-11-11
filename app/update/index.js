const page = require('page')
const firebase = require('firebase')

//configuracion de firebase
const config = require('./../config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}

var db = firebase.database()

page('/update/:codigoGame', (ctx, next) => {
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
							<input type="text" value="${game.nombre}" id="nombreGame">
							<input type="text" value="${game.precio}" id="precioGame">
							<input type="text" value="${game.descripcion}" id="descripcionGame">
						</div>

						</div>
						<div class="addtocart-bar col-sm-2" style = " text-align;center">
										<h3 class="product-title"><a id="borrar" key="${ctx.params.codigoGame}" style = "margin-top:50px">borrar</a></h3>
										<h3 class="product-title">
										<a 	id="update" 
										key="${ctx.params.codigoGame}" 
										descripcion="${game.descripcion}"
										fecha_alta="${game.fecha_alta}"
										genero="${game.genero}"
										identificador="${game.id}"
										nombre="${game.nombre}"
										precio="${game.precio}"
										url="${game.url}"
										style= "margin-top:50px">
										update
										</a>
										</h3>
						</div>
					</div>
				</div>
			</div>
		</div> <!-- .container -->


		`

		const main = document.querySelector('main')
		const title = document.querySelector('title')
		title.innerHTML = 'Update'
		main.innerHTML = html

		var borrarBtn = document.querySelector('#borrar')
		borrarBtn.addEventListener('click', borrar)

		var updateBtn = document.querySelector('#update')
		updateBtn.addEventListener('click', update)
	})
})

function update () {
	debugger;
	let doc = document;
	let key  = doc.getElementById('update').getAttribute('key')
	let nombre1  = doc.querySelector('#nombreGame').value
	let precio1  = doc.querySelector('#precioGame').value
	let descripcion1  = doc.querySelector('#descripcionGame').value
	let fecha_alta  = doc.getElementById('update').getAttribute('fecha_alta')
	let genero  = doc.getElementById('update').getAttribute('genero')
	let identificador  = doc.getElementById('update').getAttribute('id')
	let url  = doc.getElementById('update').getAttribute('url')
var updates = {};

var postData = {
    descripcion: descripcion1,
    fecha_alta: fecha_alta,
    genero: genero,
    id: identificador,
    nombre: nombre1,
    precio: precio1,
    url: url
};

console.log(key)

console.log(postData)

updates['/games/' + key] = postData;

console.log(updates)

firebase.database().ref().update(updates);

page.redirect('/tienda')
}

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