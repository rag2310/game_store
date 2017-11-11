import config from './../config'
import firebase from 'firebase'
import page from 'page'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}
	
var loginTemplate = `
<div class="col-md-12" style= "text-align: center">
				<h2 class="section-title">Sign in/ Sign up</h2>
				<div>
					<form>
						<div class = "col-md-12">
							<label>email</label>
							<input type="email" name="email" id="email">
						<div>
						<div class = "col-md-12">
							<label>Password</label>
							<input type="password" name="psw" id="password">
						</div>
						<div class = "col-md-12">
							<a id="loginEmail">Login con EMAIL</a>
						</div>
					</form>
			</div>
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
									<td class="product-name  login-container">
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

	var btnLoginEmail = document.querySelector('#loginEmail')
	if (btnLoginEmail) btnLoginEmail.addEventListener('click', loginEmail)
})

//loginEmail

function loginEmail (e) {
	e.preventDefault()

	console.log(document.querySelector('#email').value)
	console.log(document.querySelector('#password').value)
	var email = document.querySelector('#email').value
	var pass = document.querySelector('#password').value

	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
	})
}

//loginGoggle

function login (e) {
	e.preventDefault()

	let provider = new firebase.auth.GoogleAuthProvider()

	firebase.auth().signInWithPopup(provider)
		.then(result => {
			let user = result.user.providerData[0]

			let loginContainer = document.querySelector('.login-container')

			let html = `
			<div class="col-md-12" style= "text-align: center">
				<h2 class="section-title">Bienvenido ${user.displayName} </h2>
				<img style="height: 50px; border-radius: 50%;" class="photoURL" 
				src=${user.photoURL} alt=${user.displayName} />
				<div class = "col-md-12">		
					<a id="salir" href="!#" class="waves-effect waves-light btn red darken-1">Salir</a>
				</div>
			</div>`

			loginContainer.innerHTML = html

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
