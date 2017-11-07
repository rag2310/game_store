const page = require('page')
const firebase = require('firebase')
const config = require('./../config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}

var index = `<div class="container">
					<div class="page">

						<table class="cart">

							<tbody style = "text-align:center">
								<tr>
									<td class="product-name">
											<div class="col-md-12">
												<h2 class="section-title">Sing in / Sing up</h2>
												<a id="googleLogin" >Login con Google</a>
				</div> <!-- .column -->
									</td>
					</div>
				</div> <!-- .container -->

`
//	<form action="#">
	//	<input type="submit" value="Login con google">
	//</form>

	function login(e)
	{
		e.preventDefault()

		let provider = new firebase.auth.GoogleProvider()

		firebase.auth().signInWithPopup(provider)
		.then(result => {
			let user = result.user.providerData[0]

			let loginContainer = document.querySelector('.login-container') /**/

			let html =`bienvenido,${user.displayname} <img style="height: 50px; border-radius: 50%;" class="photoURL" src=${user.photoURL} alt=${user.displayName}`
      loginContainer.innerHTML= `${html}
				<li><a id="salir" href="!#">Salir</a></li>
			`

			var btnSalir = document.querySelector('#salir')
				btnSalir.addEventListener('click', logout)
		})
		.catch((err) => console.error(err.message) )

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


export default index
