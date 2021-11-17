const express = require('express'); // Include ExpressJS

const app = express(); // Create an ExpressJS app

const db = require("./src/models");
const initRoutes = require("./src/routes/web");




const bodyParser = require('body-parser'); // middleware
app.use(bodyParser.urlencoded({ extended: false }));

 // Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Home-Page/home.html');
   });

  // Route to Login Page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Login-signup-form/index.html');
  });

  app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
  });
  


  global.__basedir = __dirname;
  app.use(express.urlencoded({ extended: true }));
  initRoutes(app);
  
  
  db.sequelize.sync();
   db.sequelize.sync({ force: true }).then(() => {
     console.log("Drop and re-sync db.");
   });

  








  
  const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));

