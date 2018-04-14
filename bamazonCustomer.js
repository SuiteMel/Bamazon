var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  runApp();
});

function runApp() {
  connection.query("SELECT * FROM products",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: $" + res[i].price);
      }

      inquirer.prompt([{
        name: "idSelect",
        type: "input",
        message: "Input the Item ID of the item you would like to purchase."
      },
      {
        name: "unitBuy",
        type: "input",
        message: "How many units would you like to purchase?"
      }]).then(answer => {
        var chosenItem;
        for (var j = 0; j < res.length; j++) {
          if (res[j].item_id === parseInt(answer.idSelect)) {
            chosenItem = res[j];
          }
        }

        if (chosenItem.stock_quantity - parseInt(answer.unitBuy) >= 0) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - answer.unitBuy
              },
              {
                item_id: answer.idSelect
              }],
            function (error, results) {
              if (error) throw err;
              console.log("You have purchased " + answer.unitBuy + " of " + chosenItem.product_name);
              runApp();
            }
          );
        } else {
          console.log("Insufficient quantity!");
          runApp();
        }
      });
    });
}