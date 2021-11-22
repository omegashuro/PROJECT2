const express = require('express'); // Include ExpressJS

const app = express(); // Create an ExpressJS app

const db = require("./src/models");
const initRoutes = require("./src/routes/web");
var path = require('path');
const bodyParser = require('body-parser'); // middleware

app.use(bodyParser.urlencoded({ extended: false }));
var session = require('express-session');
var mysql = require('mysql');




app.use(express.static(__dirname+'/public'));



//Connection to Database
var connection = mysql.createConnection({
	host     : '35.193.151.189',
	user     : 'root',
	password : '1234',
	database : 'albumdatabase'
});

// let Express know we'll be using some of its packages:
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Route to new Login Page 
app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/Login-signup-form/nodelogin/login.html'));
});

app.get('/view', function(request, response) {
	response.sendFile(path.join(__dirname + '/src/views/view.html'));
});

// User Authentication in MySQL Database
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/', function(request, response) {
	if (request.session.loggedin) {
		response.redirect('/home');
    
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
    
});






 // Route to Homepage
 app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/src/views/Home.html');
   });






app.get('/upload', function(request, response) {
	response.sendFile(path.join(__dirname + '/src/controllers/sent.html'));
});



//   // Route to Login Page
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/Login-signup-form/nodelogin/login.html');
//   });

  // app.post('/login', (req, res) => {
  //   // Insert Login Code Here
  //   let username = req.body.username;
  //   let password = req.body.password;
  //   res.send(`Username: ${username} Password: ${password}`);
  // });
  


  global.__basedir = __dirname;
  app.use(express.urlencoded({ extended: true }));
  initRoutes(app);
  
  
//   db.sequelize.sync();
//    db.sequelize.sync({ force: true }).then(() => {
//      console.log("Drop and re-sync db.");
//    });

  

// Get one image by its ID
// app.get('/images/:id', (req, res, next) => {
//     let imgId = req.params.id;
 
//     Image.findById(imgId, (err, image) => {
//         if (err) {
//             res.sendStatus(400);
//         }
//         // stream the image back by loading the file
//         res.setHeader('Content-Type', 'image/jpeg');
//         fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
//     })
// });
 
// // Delete one image by its ID
// app.delete('/images/:id', (req, res, next) => {
//     let imgId = req.params.id;
 
//     Image.findByIdAndRemove(imgId, (err, image) => {
//         if (err && image) {
//             res.sendStatus(400);
//         }
 
//         del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
//             res.sendStatus(200);
//         })
//     })
// });



  
  const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));

