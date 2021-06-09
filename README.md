# **Angel's Bread Back-End**
## A back-end API application used by Angel's Bread's Front-End application

### menuApi.js
* This file contains all functions specific to retrieving menu items from Angel's Bread's Menu

### Creating the Database
* The database is composed of documents, all with the same fields
	* The Schema is as follows:
	* ![](https://github.com/JohannesMendoza/angels-bread-backend/blob/master/readme-images/schema.png)
	* The pathName field indicates which image will be used in the front-end to represent the item

### Functions
* createMenuItem(name, price, description, tags, pathname)
	* asynchronous function takes arguments and loads them into a new instance of a MenuItem object
		* an await is used for saving the item to the database
* createMenuDB()
	* function that calls createMenuItem() with the corresponding arguments to create all MenuItem objects and save them to the database
	* Function is preserved for easy setup in case the database is lost
* getMenu()
	* asynchronous function that uses an async and await to obtain ALL MenuItems from the database
* getCategoryMenu(category)
	* asynchronous function that uses an async and await to obtain MenuItems with the specific tag denoted in the parameter

### HTTP GET implementations
* /api/menuItem
* /api/menuItem/:category