//test

import firebase from 'firebase'

import config from './../config'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}



const homepage = () => {

		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		  	if (user.emailVerified == false) {
					user.sendEmailVerification().then(function() {
					 console.log("EMAIL")
					 var db = firebase.database()
					 /*var ref = db.ref("users")
						ref.push({
							id: user.uid,
							tipo: "admin"
						})*/


					function obtenerDatos (dato) {
						const datos = dato.val()
						const keys = Object.keys(datos)
						var html = ''
						var htmlGame = ''
						var index = ''
						var admin = false
						debugger;
							for( var i = 0; i <keys.length; i++) {
								const key = keys[i]
								const game = datos[key]
								console.log(game)
								if(game.tipo == "admin" && game.uid == user.uid)
								{
									console.log("es admin")
									admin = true
								}	

							}
						}
						db.ref('users').once('value').then(obtenerDatos)



					}).catch(function(error) {
					console.log("NO EMAIL")
					});
				}
				else {
					console.log("verificado")
				}
		  } else {
		    // No user is signed in.
		  }
		});



	const main = document.querySelector('main')
	main.innerHTML = `
			<div class="home-slider">
				<ul class="slides">
					<li data-bg-image="">
						<div class="container">
						<img src="https://d1z4o56rleaq4j.cloudfront.net/images/assets/Play-Killzone/_heroM/686/Killzone-Shadow-Fall.jpg?mtime=20160414075949" class="slide-image">
						</div>
					</li>

				</ul> <!-- .slides -->
			</div> <!-- .home-slider -->

			<div class="container">
					<div class="page">
						<section>
							<header>
								<h2 class="section-title"><a href ="/tienda">Videojuegos</a></h2>
								<a href="/tienda" class="all">Ver todos</a>
							</header>

							<div class="product-list">
								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 1"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 2"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 3"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="dummy/game-4.jpg" alt="juego 4"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">Precio</small>


									</div>
								</div> <!-- .product -->

							</div> <!-- .product-list -->

						</section>


					</div>
				</div> <!-- .container -->
`
}


export default homepage

	/*firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var login = `
    	<div class="right-section pull-right">
						<a href="#" class="login-button">${user.email}</a>
			</div>
    `    
    const main = document.querySelector('main')
		main.innerHTML = menu(login)*/
		/*console.log("usuario logueado")*/
  /*} else {

    var login = `
    	<div class="right-section pull-right">
						<a href="#" class="login-button">Login/Register</a>
			</div>
    `
    
    const main = document.querySelector('main')
		main.innerHTML = menu(login)*//*
		console.log("usuario no logueado")*/
  /*}

  function menu(login) {*/
  	/*console.log(login)*/
  	/*var index = `

  		${login}

			<div class="home-slider">
				<ul class="slides">
					<li data-bg-image="">
						<div class="container">
						<img src="https://d1z4o56rleaq4j.cloudfront.net/images/assets/Play-Killzone/_heroM/686/Killzone-Shadow-Fall.jpg?mtime=20160414075949" class="slide-image">
						</div>
					</li>

				</ul> <!-- .slides -->
			</div> <!-- .home-slider -->

			<div class="container">
					<div class="page">
						<section>
							<header>
								<h2 class="section-title"><a href ="/tienda">Videojuegos</a></h2>
								<a href="/tienda" class="all">Ver todos</a>
							</header>

							<div class="product-list">
								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 1"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 2"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 3"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="dummy/game-4.jpg" alt="juego 4"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">Precio</small>


									</div>
								</div> <!-- .product -->

							</div> <!-- .product-list -->

						</section>


					</div>
				</div> <!-- .container -->
`*/
/*		console.log("dentro de la funcion")
		console.log(index)*/

 /* 	return index

  }
});
*/

/*const index = `

				<div class="right-section pull-right">
						<a href="#" class="login-button">Login/Register</a>
					</div> <!-- .right-section -->

			<div class="home-slider">
				<ul class="slides">
					<li data-bg-image="">
						<div class="container">
						<img src="https://d1z4o56rleaq4j.cloudfront.net/images/assets/Play-Killzone/_heroM/686/Killzone-Shadow-Fall.jpg?mtime=20160414075949" class="slide-image">
						</div>
					</li>

				</ul> <!-- .slides -->
			</div> <!-- .home-slider -->

			<div class="container">
					<div class="page">
						<section>
							<header>
								<h2 class="section-title"><a href ="/tienda">Videojuegos</a></h2>
								<a href="/tienda" class="all">Ver todos</a>
							</header>

							<div class="product-list">
								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 1"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 2"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="" alt="juego 3"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">precio</small>

									</div>
								</div> <!-- .product -->

								<div class="product">
									<div class="inner-product">
										<div class="figure-image">
											<a href="single.html"><img src="dummy/game-4.jpg" alt="juego 4"></a>
										</div>
										<h3 class="product-title"><a href="#">Nombre</a></h3>
										<small class="price">Precio</small>


									</div>
								</div> <!-- .product -->

							</div> <!-- .product-list -->

						</section>


					</div>
				</div> <!-- .container -->
`
*/
