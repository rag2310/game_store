const menu = `
		<div class="site-header" >
				<div class="container">
					<a href="/" id="branding">
						<img src="" alt="" class="logo">
						<div class="logo-text">
							<h1 class="site-title">GAME HUB</h1>
							<small class="site-description">Todo en juegos</small>
						</div>
					</a> <!-- #branding -->

					<div class="main-navigation">
						<button class="toggle-menu"><i class="fa fa-bars"></i></button>
						<ul class="menu">
							<li  class="menu-item home current-menu-item"><a href="/"><i class="icon-home"></i></a></li>
							<li class="menu-item"><a href="/">Inicio</a></li>
							<li class="menu-item"><a href="/tienda">Tienda</a></li>
							<li class="menu-item"><a href="/biblioteca">Biblioteca</a></li>
							<li class="menu-item"><a href="/acercade">Acerca de</a></li>
						</ul> <!-- .menu -->


						<div class="mobile-navigation"></div> <!-- .mobile-navigation -->
					</div></br></br><!-- .main-navigation -->
				</div> <!-- .container -->
			</div> <!-- .site-header -->
`

const header = document.querySelector('header')

header.innerHTML = menu
