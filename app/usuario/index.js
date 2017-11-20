const page = require('page')
const firebase = require('firebase')

//configuracion de firebase
const config = require('./../config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}

var db = firebase.database()
//

page('/usuario/:codigoUser', (ctx, next) => {
	db.ref('/users/' + ctx.params.codigoUser).once('value').then((snapshot) => {
		let usuario = snapshot.val()
		let html = `
		<form>
			<input type="text" value="${usuario.displayName}" id="displayNameUsuario">
			<input type="text" value="${usuario.tipo}" id="tipoUsuario">
		</form>

		<a 	id="update" class ="button"
										key="${ctx.params.codigoUser}"
										email="${usuario.email}"
										emailVerified="${usuario.emailVerified}"
										photoURL="${usuario.photoURL}"
										uid="${usuario.uid}"
										style= "margin-top:0px">
										update
		</a>
		`
		const main = document.querySelector('main')
		const title = document.querySelector('title')
		main.innerHTML = html
		title.innerHTML = 'Usuario'

		var updateBtn = document.querySelector('#update')
		updateBtn.addEventListener('click', update)
	})
})

function update () {
	let doc = document;
	let key  = doc.getElementById('update').getAttribute('key')
	let tipoUsuario1  = doc.querySelector('#tipoUsuario').value
	let displayNameUsuario1  = doc.querySelector('#displayNameUsuario').value

	let email1  = doc.getElementById('update').getAttribute('email')
	let emailVerified1  = doc.getElementById('update').getAttribute('emailVerified')
	let photoURL1  = doc.getElementById('update').getAttribute('photoURL')
	let uid1  = doc.getElementById('update').getAttribute('uid')

var updates = {};

var postData = {
    displayName: displayNameUsuario1,
		email : email1,
		emailVerified : emailVerified1,
		photoURL : photoURL1,
		providerData : [{
			"email": email1,
			"providerId": "google.com",
			"uid": email1
		}],
		tipo : tipoUsuario1,
		uid : uid1
};

console.log(key)

console.log(postData)

updates['/users/' + key] = postData;

console.log(updates)

firebase.database().ref().update(updates);

page.redirect('/')

}
