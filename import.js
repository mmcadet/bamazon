var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "housebed14",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('bamazonProducts.csv')
  });
  
  lineReader.on('line', function (line) {
    var data = line.split(",");
    var importObject = {
        item_id: parseInt(data[0]),
        product_name: data[1],
        department_name: data[2],
        price: parseFloat(data[3]),
        stock_quantity: parseInt(data[4])
    }
    connection.query('insert into Products set ?', importObject, function(err, res) {
        console.log(res + " product inserted!\n");
      })
  });
});