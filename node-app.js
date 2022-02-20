const http = require('http');
const ProductController = require('./src-node/controllers/product-controller');

const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET') {  // GET /api/products  
        ProductController.getProducts(req, res)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') { // GET /api/products/:id
        const id = req.url.split('/')[3]
        ProductController.getProduct(req, res, id)
    } else if(req.url === '/api/products' && req.method === 'POST') { // POST /api/products
        ProductController.createProduct(req, res)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') { // PUT /api/products/:id
        const id = req.url.split('/')[3]
        ProductController.updateProduct(req, res, id)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') { // DELETE /api/products:id
        const id = req.url.split('/')[3]
        ProductController.deleteProduct(req, res, id)
    } else {                                                                    // 404 not found
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    };
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
});