//IMPORT
import firebase from 'firebase'
import config from './../config'
import page from 'page'

const db = firebase.database()

//CONFIGURACION DE LA BASE DE DATOS DE FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

//RUTA DEL DETALLE DE LOS JUEGOS DE LA BIBLIOTECA
page('/detalleBiblioteca/:codigoGame', (ctx, next) => {

	//HACEMOS REFERENCIA A UN JUEGO ESPECIFICO
	db.ref('/biblioteca/' + ctx.params.codigoGame).once('value').then((snapshot) => {

		//VARIABLE
		let game = snapshot.val()

		//INSERTAMOS INFORMACION A EL HTML
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
			</div> <!-- .container -->
		`
		//OBTENEMOS ETIQUETAS DEL HTML
		const main = document.querySelector('main')
		const title = document.querySelector('title')
		main.innerHTML = html
		title.innerHTML = 'Detalle'
	})
})