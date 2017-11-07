const page = require('page')
const firebase = require('firebase')

const config = require('./../config')

if (!firebase.apps.length) {
	firebase.initializeApp(config)
	}

var index = `<h1>bienvenido</h1>`

export default index 