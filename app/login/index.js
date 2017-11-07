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



export default index
