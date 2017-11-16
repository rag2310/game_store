const menu = `
		<div class="site-header" >
				<div class="container">
					<a href="/" id="branding">
						<img src="https://firebasestorage.googleapis.com/v0/b/dbgamestore-2ad64.appspot.com/o/iconos%2Flogo.png?alt=media&token=dba002f3-75ca-4e34-afaf-c8c39aad6450" alt="" class="logo">
						<div class="logo-text">
							<h1 class="site-title">GAME HUB</h1>
							<small class="site-description">Todo en juegos</small>
						</div>
					</a> <!-- #branding -->

					<div class="right-section pull-right">
						<a href="/login" class="login-button">Login/Register</a>
					</div> <!-- .right-section -->


					<div class="main-navigation">
						<button class="toggle-menu"><i class="fa fa-bars"></i></button>
						<ul class="menu">
							<li  class="menu-item home"><a href="/"><img  class = icon-home src="https://firebasestorage.googleapis.com/v0/b/dbgamestore-2ad64.appspot.com/o/iconos%2Ficon-home.png?alt=media&token=1c7db695-de57-46ca-85c5-f9775cf2f583 "></img></a></li>
							<li class="menu-item"><a href="/tienda">Tienda</a></li>
							<li class="menu-item"><a href="/biblioteca">Biblioteca</a></li>
							<li class="menu-item"><a href="/acercade">Acerca de</a></li>
							<li class="menu-item"><a href="/guardar">Guardar</a></li>
							<li class="menu-item"><a href="/correo">Email</a></li>
							<li class="menu-item"><a href="/update">Update</a></li>
						</ul> <!-- .menu -->
						<div class="mobile-navigation">
						</div> <!-- .mobile-navigation -->
					</div> </br></br><!-- .main-navigation -->
						</div>
					</div>
				</div> <!-- .container -->
			</div> <!-- .site-header -->
`

const header = document.querySelector('header')

header.innerHTML = menu
