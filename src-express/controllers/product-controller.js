const Product = require('../models/product-model');

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
    };
};

async function getProduct(req, res, next) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if(product) {
            res.status(200).send(product);
            return;
        } 
        next();
    } catch (error) {
        console.log(error);
    };
};

async function createProduct(req, res, next) {
    try {
        const product = req.body;
        const newProduct = await Product.create(product);
        res.status(201).send(newProduct);
    } catch (error) {
        console.log(error);
    };
};

async function updateProduct(req, res, next) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if(product) {
            const editedProduct = req.body;

            const productData = {
                name: editedProduct.name || product.name,
                description: editedProduct.description || product.description,
                price: editedProduct.price || product.price
            };

            const updatedProduct = await Product.update(id, productData);
            res.status(200).send(updatedProduct);
            return;
        };
        next(); 
    } catch (error) {
        console.log(error)
    };
};

async function deleteProduct(req, res, next) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(product) {
            await Product.remove(id);
            res.status(200).send({ message: `Product ${id} removed` });
            return;
        }
        next(); 
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};