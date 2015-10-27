var express = require("express");
var router = express.Router();
var Product = require("../models/product");

router.route('/products')

	//returns all products
	.get(function(req, res){
		Product.find({}, function (err, products) {
            if (err) {
            	res.status(500).send(err);
                return;
            }
            res.json(products);
        });
	})
	
	// add product 
	.post(function(req, res){
		var product = new Product({
			title: req.body.title,
			description: req.body.desc,
			sku: req.body.sku,
			price: req.body.price
        });
		// save the data
		product.save(function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json({message: "Product Added."});
        });
	});

router.route("/products/:id")
	// get paticular product
	.get(function(req, res){
		var response = {};
        Product.findById(req.params.id,function(err,product){
        	if(err) {
                response = {message: "No product found."};
            } else {
                response = product;
            }
            res.json(response);
        });
	})
	
	// update product
	.put(function(req, res){
		var response = {};
		Product.findById(req.params.id,function(err,product){
            if(err) {
            	res.status(500).send(err);
                return;
            } else {
                if(req.body.title !== undefined) {
                	product.title = req.body.title;
                }
                if(req.body.desc !== undefined) {
                	product.description = req.body.desc;
                }
                if(req.body.sku !== undefined) {
                	product.sku = req.body.sku;
                }
                if(req.body.price !== undefined) {
                	product.price = req.body.price;
                }
                // save the data
                product.save(function(err){
                    if(err) {
                    	res.status(500).send(err);
                        return;
                    } else {
                        response = {message: "Product Updated."};
                    }
                    res.json(response);
                });
            }
        });
	})
	
	// delete product
	.delete(function(req, res){
		Product.findById(req.params.id,function(err,product){
            if(err) {
            	res.status(500).send(err);
            	return;
            } else {
                // data exists, remove it.
            	Product.remove({_id : req.params.id},function(err){
                    if(err) {
                    	res.status(500).send(err);
                    	return;
                    } else {
                    	res.json({message: "Product Deleted."});
                    }
                    
                });
            }
        });
	})

module.exports = router;