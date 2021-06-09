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
* createMenuDB()
* getMenu()
* getCategoryMenu()
* 