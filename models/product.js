var mongoose    =   require("mongoose");
var Schema      =   mongoose.Schema;

/**
 * Create Product Schema.
 * @type {*|Schema}
 */
var ProductSchema = new Schema({
	title : String,
	description : String,
	sku : String,
	price : Number,
	created : {type : Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema);
