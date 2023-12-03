// Requiring module
const express = require("express");
var path = require('path');

const app = express();

function authentication(req, res, next) {
	// Utworzenie zmiennej do przechowywania nagłówka z uwierzytelnieniem z zapytania (request)
	var authheader = req.headers.authorization;
	console.log(req.headers);

	// Gdy brak takiego nagłówka, ustawiamy w odpowiedzi (response) nagłówek 'WWW-Authenticate' jako 'Basic', status błędu na 401
	// i wywołujemy wbudowaną funkcję do obsługi błędów (ponieważ nie zdefiniwaliśmy własnej)
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}

// Dekodowanie wprowadzonyego hasła i nazwy użytkownika
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	// Sprawdzenie czy hasło i nazwa użytkownika się są właściwe
	if (user == 'validUser' && pass == 'password') {

		// If Authorized user
		// wywołujemy kolejną funkcję, czyli express.static z index.html
		next();
	} else {
		// w przeciwnym wypadku, ten sam błąd co w przypadku braku nagłówka z uwierzytelnieniem
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}

// First step is the authentication of the client
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));

// Server setup
app.listen((3000), () => {
	console.log("Server is Running");
})