import config from './../config'
import firebase from 'firebase'
import page from 'page'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}
	
var loginTemplate = `
<div class="col-md-12" style= "text-align: center">
				<h2 class="section-title">Sign in/ Sign up</h2>
			<div class = "col-md-12">
				<a id="googleLogin" class="waves-effect waves-light btn red darken-1">Login con Google</a>
			</div>
			</div> <!-- .column -->
		</div> <!-- .row -->
`

var template = `
<div class="container">
					<div class="page">

						<table class="cart">
							<tbody>
								<tr>
									<td class="product-name">
										${loginTemplate}
									</td>
								</tr>
						</table
					</div>
				</div> <!-- .container -->
    `

page('/login', ()=> {
	var main = document.querySelector('main')

	main.innerHTML = template

	var btnLogin = document.querySelector('#googleLogin')
	if (btnLogin) btnLogin.addEventListener('click', login)
})

//login

function login (e) {
	e.preventDefault()

	let provider = new firebase.auth.GoogleAuthProvider()

	firebase.auth().signInWithPopup(provider)
		.then(result => {
			let user = result.user.providerData[0]

			let loginContainer = document.querySelector('.login-container')

			let html = `Bienvenido ${user.displayName} <img style="height: 50px; border-radius: 50%;" class="photoURL" src=${user.photoURL} alt=${user.displayName} />`
			loginContainer.innerHTML = `
				${html}
				<li><a id="salir" href="!#">Salir</a></li>`

			var btnSalir = document.querySelector('#salir')
			btnSalir.addEventListener('click', logout)
		})
		.catch((err) => console.error(err.message))
}

function logout (e) {
	e.preventDefault()

	firebase.auth().signOut().then(() => {
		let loginContainer = document.querySelector('.login-container')
		loginContainer.innerHTML = loginTemplate
		var btnLogin = document.querySelector('#googleLogin')
		if (btnLogin) btnLogin.addEventListener('click', login)
	})
	.catch((error) => {
		console.log(err.message)
	})
}
