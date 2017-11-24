import config from './../config'
import firebase from 'firebase'
import page from 'page'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

const db = firebase.database()

var loginTemplate = `
<div class="col-md-12" style= "text-align: center">
				<h2 class="section-title">Sign in/ Sign up</h2>
				<div>
					<form>

						<div class = "col-md-12"  >
						<label>email</label>
						<input type="email" name="email" id="email" style = "padding: 10px 56px" >
							<label style = "margin-left: 13px">Password</label>
							<input type="password" name="psw" id="password" style = "padding: 10px 56px" >
						</div>
						<div class = "col-md-12" style = "margin-top:21px">
							<a id="loginEmail" class= "button">Login con EMAIL</a>
						</div>
					</form>
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
			</tbody>
		</table
	</div>
</div> <!-- .container -->
`

page('/login', ()=> {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var main = document.querySelector('main')
			main.innerHTML = template
			let loginContainer = document.querySelector('.login-container')

			let html = `
			<div class="col-md-12" style= "text-align: center">
				<h2 class="section-title">Bienvenido ${user.email} </h2>
				<div class = "col-md-12">
					<a id="salir" href="!#" class="waves-effect waves-light btn red darken-1">Salir</a>
				</div>
			</div>`

			loginContainer.innerHTML = html

			var btnSalir = document.querySelector('#salir')
			btnSalir.addEventListener('click', logout)
		} else {
			var main = document.querySelector('main')
			main.innerHTML = template
			var btnLoginEmail = document.querySelector('#loginEmail')
			if (btnLoginEmail) btnLoginEmail.addEventListener('click', loginEmail)
		}
	});
})

function loginEmail (e) {
	e.preventDefault()	
	var email = document.querySelector('#email').value
	var pass = document.querySelector('#password').value

	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var registrarse = confirm("Este usuario no existe")
		if (registrarse) {
			firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			})			

			

			firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			    var ref = db.ref("users")
						ref.push({							
							displayName : user.email,
      				email : user.email,
      				emailVerified : user.emailVerified,
      				photoURL : user.photoURL,
      				providerData : user.providerData,
      				tipo : "cliente",
      				uid : user.uid
						})
			  } 
			});
		}
	})

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			let loginContainer = document.querySelector('.login-container')

			let html = `
			<div class="col-md-12" style= "text-align: center">
				<h2 class="section-title">Bienvenido ${user.email} </h2>
				<div class = "col-md-12">
					<a id="salir" href="!#" class="waves-effect waves-light btn red darken-1">Salir</a>
				</div>
			</div>`

			loginContainer.innerHTML = html

			var btnSalir = document.querySelector('#salir')
			btnSalir.addEventListener('click', logout)
		} 
	});
}

function logout (e) {
	e.preventDefault()

	firebase.auth().signOut().then(() => {
		page.redirect('/')
	})
	.catch((error) => {
		console.log(err.message)
	})
}
