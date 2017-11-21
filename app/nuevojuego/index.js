import config from './../config'
import firebase from 'firebase'
import page from 'page'

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

var db = firebase.database()

page('/guardar',() => {
	const main = document.querySelector('main')
	main.innerHTML = formTemplate
	var guardarBtn = document.querySelector('#guardar')
	guardarBtn.addEventListener('click', guardar)

	var inputFile = document.getElementById('file')
	inputFile.addEventListener('change', seleccionarImagen, false)
})


var formTemplate = `
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
								<a id="guardar" class = "button">Guardar</a>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	<form>
</div>
`

var fileSelected = null

function guardar (e){

	e.preventDefault()

	var storageRef = firebase.storage().ref()
	var thisRef = storageRef.child(fileSelected.name);

	thisRef.put(fileSelected)
	.then((snapshot) => {
		return snapshot.downloadURL
	})
	.then(imgURL => {
		var ref = db.ref("games")
		ref.push({
			descripcion: document.querySelector('#descripcion').value,
			fecha_alta: "07 de noviembre del 2017",
			genero: ["test","prueba"],
			id: 5,
			nombre: document.querySelector("#nombre").value,
			precio: document.querySelector("#precio").value,
			url: imgURL
		})

		page.redirect('/tienda')
	})
	.catch(err => console.error(err))
}

function seleccionarImagen(e) {
	var target = e.target
	fileSelected = target.files[0]
}
