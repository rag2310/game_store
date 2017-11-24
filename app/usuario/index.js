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



		<div class="col-md-12" style= "text-align: center">
						</br><h2 class="section-title">Configuracion de Usuario</h2>
						<div>
							<form>

								<div class = "col-md-12"  >
								<label>email</label>
								<input type="text" value="${usuario.displayName}" id="displayNameUsuario" style = "padding: 10px 56px">
									<label style = "margin-left: 13px">Tipo</label>
									<input type="text" value="${usuario.tipo}" id="tipoUsuario" style = "padding: 10px 56px">
								</div>
								<div class = "col-md-12" style = "margin-top:21px">
								<a 	id="update" class ="button"
																key="${ctx.params.codigoUser}"
																email="${usuario.email}"
																emailVerified="${usuario.emailVerified}"
																photoURL="${usuario.photoURL}"
																uid="${usuario.uid}"
																style= "margin-top:0px">
																Actualizar
								</a>
								</div>
							</form>
					</div>
					</div> <!-- .column -->
				</div> <!-- .row --></br></br></br></br></br>
				</br></br></br></br></br></br></br></br></br></br>

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
