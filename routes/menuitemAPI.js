const express = require("express");
const router = express.Router();
app = express();
app.use(express.json());
//res.header("Access-Control-Allow-Origin", "*");

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err => console.error('Could not connect to MongoDDB...', err)));

//Schema

const menuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    tags: [String],
    pathName: String
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

async function createMenuItem(nm, pr, desc, tgs, pn) {
    const item = new MenuItem({
        name: nm,
        price: pr,
        description: desc,
        tags: tgs,
        pathName: pn
    });

    const result = await item.save();
    console.log(result);
}

function createMenuDB() {
    createMenuItem('Ube Pandesal', 15, 'A dozen of our special pandesal made with ube and a cheese filling', ['bread', 'specialties', 'pandesal'], 'ube-pandesal');
    createMenuItem('Classic Pandesal', 15, 'The classic savory bread with a sweet accent', ['bread', 'specialties', 'pandesal'], 'ube-pandesal');
    createMenuItem('Brioche Flan', 18, '5 brioche donuts filled with homemade ube custard and topped with leche flan and burnt caramel', ['bread', 'specialties', 'pandesal'], 'classic-pandesal');
    createMenuItem('Fresh Lumpia', 12, '4 Pieces of quality fresh veggies wrapped in a homemade egg wrapper, and topped with peanut sauce, garlic, and peanuts', ['bread', 'specialties', 'pandesal'], 'fresh-lumpia');
    createMenuItem('Pork and Shrimp Siomai', 10, 'A dozen of our Pork and Shrimp Siomai', ['snacks', 'appetizers'], 'siomai');
    createMenuItem('Milky Cheese Roll', 15, 'A pillowy-soft bread with perfect sweetness', ['bread', 'specialties'], 'cheese-roll');
    createMenuItem('Sisig Nachos', 60, 'Our special sisig served in a party tray with chips', ['appetizers', 'party-trays', 'snacks'], 'sisig-nachos');
    createMenuItem('Guava Cream Cheese Pandesal', 15, 'A dozen of our special pandesal made with guava and a cream cheese filling', ['bread', 'pandesal'], 'guava-cheese-pandesal');
    createMenuItem('Milo Dalgona Pandesal', 15, 'A dozen of our special pandesal made with milo chocolate and a cream cheese filling', ['pandesal', 'bread', 'specialties'], 'milo-dalgona-pandesal');
    createMenuItem('Pan De Yema Pandesal', 15, 'A dozen of our special pandesal made with our eggy bread and a cream cheese filling', ['pandesal', 'bread', 'specialties'], 'pan-de-yema-pandesal');
    createMenuItem('Red Velvet Pandesal', 15, 'A dozen of our special pandesal made with a red velvet breading and a cream cheese filling', ['pandesal', 'bread', 'specialties'], 'red-velvet-pandesal');
    createMenuItem('Bibingka', 10, 'A plate of our baked rice cake that encases a salted egg at its core', ['bread', 'specialties'], 'bibingka');
    createMenuItem('Embutido', 15, 'Our baked pork meat loaf', ['appetizers'], 'embutido');
    createMenuItem('Buttercream Sylvana', 15, 'Our sandwich cookie filled with our special buttercream', ['bread', 'sylvanas'], 'buttercream-sylvana');
    createMenuItem('Ube Sylvana', 15, 'Our ube sandwich cookie filled with our special ube buttercream', ['bread', 'sylvanas'], 'ube-sylvana');
    createMenuItem('Pandan Sylvana', 15, 'Our pandan sandwich cookie filled with our special pandan buttercream', ['bread', 'sylvanas'], 'pandan-sylvana');
    createMenuItem('Frozen Ube Brazo de Mercedes', 12, 'A cup of our jelly rolled ube cake', ['bread', 'specialties'], 'brazo-de-mercedes');
}

async function getMenu() {
    const items = await MenuItem
        .find()
    //.find({ name: /.*frozen.*/i })
    //.select({ name: 1, price: 1, pathName: 1 });
    return items;
}

async function getCategoryMenu(categ) {
    const items = await MenuItem
        .find({ tags: categ });
    //.select({ name: 1, price: 1, pathName: 1 });
    return items;
}

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on Port ${port}!!!`));


getMenu().then(items => {
    console.log(items);
})

app.get('/api/menuItem', (req, res) => {
    console.log('SENDING MENU ITEMS');
    getMenu().then(items => {
        res.send(items);
    })
});

app.get('/api/menuItem/:category', (req, res) => {
    console.log('SENDING MENU ITEMS FROM ', req.params.category);
    getCategoryMenu(req.params.category).then(items => {
        res.send(items);
    })
});


router.get("/", function (req, res, next) {
    console.log('API IS WORKING BRO!!!');
    res.send({ data: "hello" });
});

module.exports = router;