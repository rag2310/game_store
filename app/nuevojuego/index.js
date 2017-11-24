//IMPORT
import config from './../config'
import firebase from 'firebase'
import page from 'page'


//CONFIGURAMOS FIREBASE
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

//VARIABLES
const db = firebase.database()

//URL PARA GUARDAR JUEGO
page('/guardar',() => {
	
	//OBTENEMOS ELEMENTOS DEL HTML
	const main = document.querySelector('main')
	main.innerHTML = formTemplate

	//AGREGAMOS EVENTOS A CONTROLES DEL HTML
	var guardarBtn = document.querySelector('#guardar')
	guardarBtn.addEventListener('click', guardar)
	var inputFile = document.getElementById('file')
	inputFile.addEventListener('change', seleccionarImagen, false)
})

//CREAMOS EL FORMULARIO DEL GUARDADO
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
		</form>
	</div>
`

//VARIABLES
var fileSelected = null

//FUNCION GUARDAR
function guardar (e){

	e.preventDefault()

	//HACEMOS REFERENCIA A EL STORAGE DE EL FIREBASE
	var storageRef = firebase.storage().ref()
	var thisRef = storageRef.child(fileSelected.name);

	//INSERTAMOS LA IMAGEN SELECIONADA
	thisRef.put(fileSelected)
	.then((snapshot) => {

		//RETORNAMOS EL URL DE ESA IMAGEN
		return snapshot.downloadURL
	})
	.then(imgURL => {



		//HACEMOS REFERENCIA A LA TABLA GAMES DEN FIREBASE
		var ref = db.ref("games")

		//OBTENEMOS LA FECHA ACTUAL
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();

		//OBTENEMOS LAS FECHAS
		if(dd<10) {
			dd = '0'+dd
		} 

		if(mm<10) {
			mm = '0'+mm
		} 

		today = mm + '/' + dd + '/' + yyyy;

		//OBTENEMOS UN NUMERO ALEATORIO

		var idAlt = Math.floor((Math.random() * 100) + 1)
		
		//INSERTAMOS LA INFORMACION DEL JUEGO
		ref.push({
			descripcion: document.querySelector('#descripcion').value,
			fecha_alta: today,
			genero: ["ACCION","AVENTURA"],
			id: idAlt,
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
