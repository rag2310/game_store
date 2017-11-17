import page from 'page'
import homepage from './homepage'
import acercade from './acercade'
import cargarDatosTienda from './tienda'
import cargarDatos from './biblioteca'
import layout from './layout'
import './nuevojuego'
import './login'

page('/', () => {
	const main = document.querySelector('main')
	main.innerHTML = homepage
})

page('/acercade', () => {
	const main = document.querySelector('main')
	main.innerHTML = acercade
})

page('/tienda', cargarDatosTienda)

page('/biblioteca',cargarDatos)

page('/biblioteca',cargarDatos)

//test

import config from './../config'
import firebase from 'firebase'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

page('/update', () => {
	const main = document.querySelector('main')
	main.innerHTML = formTemplate
})

var formTemplate = `
<!--<div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="Placeholder" id="nombre" type="text" class="validate">
          <label for="nombre">Nombre</label>
        </div>
        <div class="input-field col s6">
          <input id="descripcion" type="text" class="validate">
          <label for="apellido">Descripcion</label>
        </div>
        <div class="col s6">
          <div class="file-field input-field">
            <div class="btn">
                <span>File</span>
                <input type="file" id="file">
            </div>
             <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
            </div>
          </div>
      </div>
      <a id="guardar" class="waves-effect waves-light btn">Guardar</a>
    </form>
  </div>
  </div>-->

<div class="page">
	<form>
		<table class="cart">
			<tbody>
				<tr>
					<td class="product-name">
						<div class="row">
							<div class="col-md-6" style ="text-align:center">
								<h2 class="section-title">Nombre</h2>
								<input type="text" placeholder="Nombre" id="nombre">
							</div>
							<div class="col-md-6" style ="text-align:center">
								<h2 class="section-title">Descripción</h2>
								<input type="text" placeholder="Nombre" id="descripcion">
							</div>
							<div class="col-md-6" style ="text-align:center">
								<h2 class="section-title" >Precio</h2>
								<input type="text" placeholder="Nombre" id="precio">
							</div>
							<div class="col-md-6" style ="text-align:center">
								<div class="file-field input-field" style=" margin-top:49px" >
									<div class="btn">
										<span>File</span>
										<input type="file" id="file">
									</div>
								</div>
							</div>
							<div class="col-md-6" style ="text-align:center">
							</div>
							<div class="col-md-12" style = "text-align:center" >
								<a id="guardar">Guardar</a>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	<form>
</div>
`

//test


//test



var form = `
<div>
<form>
	<label>email</label>
	<input type="email" name="email" id="email">
	<label>Password</label>
	<input type="password" name="psw" id="password">
	<a id="loginEmail">Login con EMAIL</a>
</form>
</div>`

page('/correo', () => {
	const main = document.querySelector('main')
	main.innerHTML = form
	var guardarBtn = document.querySelector('#loginEmail')
	guardarBtn.addEventListener('click', test)
})

function test () {
	console.log(document.querySelector('#email').value)
	console.log(document.querySelector('#password').value)
	var email = document.querySelector('#email').value
	var pass = document.querySelector('#password').value

	firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
	})
}
//test
