# Bamazon

Bamazon is a command line interface that has two files. bamazonCustomer.js and bamazonManager.js.
These files allow the user to access the bamazon database and purchase items if using the bamazonCustomer.js.
If using the bamazonMangaer.js, the user can view the all items, view low inventory items, add inventory to items, and add more items to the database.
Because this application uses inquirer, users do not need to worry about typing anything except `node bamazonCustomer.js` or `node bamazonManager.js` to start and run the application.

![bamazonCustomer demo](https://github.com/SuiteMel/Bamazon/raw/master/bamazonCustomer_demo.gif)

![bamazonManager demo](https://github.com/SuiteMel/Bamazon/raw/master/bamazomManager_demo)

## How to get started
This app uses node.js, npm and MySQL. In your console type `npm install` to aquire the required node libraries to run this app. You will also need to run the schema.sql in application such as MySQL Workbench to create the database and a seed.sql file is provided to fill the database with data.

