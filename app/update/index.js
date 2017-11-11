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
							<input type="text" value="${game.nombre}">
							<input type="text" value="${game.precio}">
							<input type="text" value="${game.descripcion}">
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
										id="${game.id}"
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
	let doc = document;
	let key  = doc.getElementById('update').getAttribute('key')
	let descripcion  = doc.getElementById('update').getAttribute('descripcion')
	let fecha_alta  = doc.getElementById('update').getAttribute('fecha_alta')
	let genero  = doc.getElementById('update').getAttribute('genero')
	let id  = doc.getElementById('update').getAttribute('id')
	let nombre  = doc.getElementById('update').getAttribute('nombre')
	let precio  = doc.getElementById('update').getAttribute('precio')
	let url  = doc.getElementById('update').getAttribute('url')
var updates = {};

var postData = {
    descripcion: descripcion,
    fecha_alta: fecha_alta,
    genero: genero,
    id: id,
    nombre: nombre,
    precio: precio,
    url: url
};


console.log(postData)

/*

	updates['/posts/' + newPostKey] = postData;

	if (key!=null && confirmarBorrado == true) {
		var ref = db.ref("games")
		ref.child(key).remove()

		page.redirect('/tienda')
	}*/
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