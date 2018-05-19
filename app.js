var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  else{
      console.log("connection established")

  }
  console.log("connected as id " + connection.threadId);
  
})
//trying to see what data i get the data

connection.connect(function(err) {
  // if (err) throw err;
  connection.query("SELECT * FROM burgers;", function (err, result, fields) {
    // if (err) throw err;
    console.log(result);
  });
});

// connect to the database and render the index page with handlebars
app.get("/", function(req,res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
        if (err) {
          return res.status(500).end();
        }
        
        res.render("index", { burgers: data });
      });
})


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });  