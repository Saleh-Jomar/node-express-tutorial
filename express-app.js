const express = require('express');
const http = require('http');

//Import Routes
const productRoute = require('./src-express/routes/product-route');

//Create Express App
const app = express();

//Middleware Setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Use routes
app.use('/api/products', productRoute);

//404 Not Found
app.use(function(req, res, next) {
    res.status(404);
    res.send({ error: 'Not found' });
});
//Server setup
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
});
