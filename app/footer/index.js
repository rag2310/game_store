//CREAMOS EL HTML DEL FOOTER
const pie_de_pagina = `
	<div class="site-footer">
		<div class="colophon">
			<div class="copy">
				Copyright 2017 Game Hub. Designed by Bizzarro. All rights reserved.
			</div>
		</div> <!-- .colophon -->
	</div> <!-- .container -->
`

//OBTENEMOS ETIQUETAS ESPECIFICAS
const footer = document.querySelector('footer')

//INSERTAMOS EL HTML AL FOOTER
footer.innerHTML = pie_de_pagina
