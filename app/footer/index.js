const pie_de_pagina = `
<div class="site-footer">
	<div class="container">
		<div class="row">
			<div class="col-md-2">
				<div class="widget">
					<h3 class="widget-title">Informacion</h3>
					<ul class="no-bullet">
						<li><a href="/contactos">contactanos</a></li>
						<li><a href="/acercade">Acerca de </a></li>
						<li><a href="/biblioteca">Biblioteca</a></li>
						<li><a href="/busqueda">Busqueda</a></li>
					</ul>
				</div> <!-- .widget -->
			</div> <!-- column -->
		</div>
	</div>
</div>	
`
const footer = document.querySelector('footer')			

footer.innerHTML = pie_de_pagina