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
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  }).then(answer => {
    switch (answer.action) {
      case "View Products for Sale":
        viewInv();
        break;

      case "View Low Inventory":
        viewLowInv();
        break;

      case "Add to Inventory":
        addInv();
        break;

      case "Add New Product":
        addProduct();
        break;
    }
  });
}

function viewInv() {
  var query = "SELECT * FROM products";
  connection.query(query,
    function (err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Stock Available: " + res[i].stock_quantity);
      }
      runApp();
    }); 
}

function viewLowInv() {
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query,
    function (err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Stock Available: " + res[i].stock_quantity);
      }
      runApp();

      if (res.length === 0) {
        console.log("All items are well stocked");
        runApp();
      }
    });
}

function addInv() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "choice",
        type: "list",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name);
          }
          return choiceArray;
        },
        message: "What item would you like to add inventory to?"
      },
      {
        name: "amount",
        type: "input",
        message: "How much inventory would you like to add?"
      }
    ]).then(answer => {
      var chosenItem;
      for (var i = 0; i < res.length; i++) {
        if (res[i].product_name === answer.choice) {
          chosenItem = res[i];
        }
      }
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: chosenItem.stock_quantity + parseInt(answer.amount)
          },
          {
            item_id: chosenItem.item_id
          }
        ],
        function (error) {
          if (error) throw err;
          console.log("Stock has been updated");
          runApp();
        }
      );
    });
  });
}

function addProduct() {
  inquirer.prompt([
    {
      type: "input",
      message: "Product Name: ",
      name: "product"
    },
    {
      type: "input",
      message: "Department Name: ",
      name: "department"
    },
    {
      type: "input",
      message: "Price: ",
      name: "price"
    },
    {
      type: "input",
      message: "Stock Quantity: ",
      name: "stock"
    }
  ]).then(answer => {
    connection.query("INSERT INTO products SET ?",
      {
        product_name: answer.product,
        department_name: answer.department,
        price: parseInt(answer.price),
        stock_quantity: parseInt(answer.stock)
      }, function (err, res) {
        if (err) throw err;
        console.log("Item has been added to products inventory");
        runApp();
      }
    );
  });
}

//add validation for possible empty inputs