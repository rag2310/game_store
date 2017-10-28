const page = require('page')
const firebase = require('firebase')

//configuracion de firebase
const config = require('./../config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}

var db = firebase.database()

page('/detalle/:codigoGame', (ctx, next) => {
	db.ref('/games/' + ctx.params.codigoGame).once('value').then((snapshot) => {
		let game = snapshot.val()
		let html = `
			<div>
				<h1>${game.nombre}</h1>
			</div>
		`

		const main = document.querySelector('main')

		main.innerHTML = html
	})
})