var mysql = require('mysql');
var inquirer = require('inquirer');

// DATABASE CONNECT //

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "housebed14",
	database: "bamazon_db"
});

function start(){

// ITEMS for SALE //

connection.query('SELECT * FROM Products', function(err, res){
	if(err) throw err;
	console.log('Hello, Welcome to Bamazon!')
	console.log('----------------------------------------')

	for(var i = 0; i < res.length; i++) {
	console.log("ID: " + parseInt(res[i].item_id) + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + parseFloat(res[i].price) + " | " + "Quantity: " + parseInt(res[i].stock_quantity));
	console.log('----------------------------------------')
	}	

// PURCHASE QUESTIONS //

console.log(' ');
inquirer.prompt([
	  {
		type: "input",
		name: "id",
		message: "Item ID for purchase?",
		validate: function(value){
			if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
				return true;
			} else{
				return false;
			}
		  }
	    },
	  {
		type: "input",
		name: "amount",
		message: "Amount you need to purchase?",
		validate: function(value){
			if(isNaN(value)){
				return false;
			} else{
				return true;	
			}
		  }
	    }

// BUY OPTIONS //

]).then(function(ans){
	var buyWhat = (ans.id)-1;
	var buyHowMuch = parseInt(ans.amount);
	var finalTotal = parseFloat(((res[buyWhat].price)*buyHowMuch).toFixed(2));

// STOCK AVAILABLE //

	if(res[buyWhat].stock_quantity >= buyHowMuch){
		connection.query("UPDATE Products SET ? WHERE ?", [
			{stock_quantity: (res[buyWhat].stock_quantity - buyHowMuch)},
			{item_id: ans.id}
			], function(err, result){
				if(err) throw err;
				console.log("\nThank you for your purchase! Your total price is $" + finalTotal.toFixed(2) + ". Thanks for shopping at Bamazon!\n");
			});

		connection.query("SELECT * FROM Products", function(err, deptRes){
			if(err) throw err;
			var index;
			for(var i = 0; i < deptRes.length; i++){
				if(deptRes[i].department_name === res[buyWhat].department_name){
					index = i;
				}
			}
});
	} else{
	  console.log("Insufficient quantity!");
	}	
	reprompt();
	})
})
}

// ANOTHER PURCHASE //

function reprompt(){
	inquirer.prompt([{
		type: "confirm",
		name: "reply",
		message: "Do you have another purchase?",
	}]).then(function(ans){
		if(ans.reply){
			start();
		} else{
			console.log("Thank you, please come again!");
		}
	});
}

start();