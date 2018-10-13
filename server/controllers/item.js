const Item = require('../models/item');


exports.item_create_item = (req, res) => {
    Item.sync()
        .then(() => {
            Item.create({
                    item_name: req.body.item_name
                })
                .then(result => {
                    res.status(200).json({
                        success: true,
                        message: "Item created!"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        error: err
                    });
                });
        });
};


exports.item_get_all_item = (req, res) => {
    Item.findAll()
        .then(result => {
            res.status(200).json({
                success: true,
                message: result
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err
            });
        });
};


exports.item_update_item = (req, res) => {
    Item.update({
            item_name: req.body.item_name
        }, {
            where: {
                id: req.params.itemId
            }
        })
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Item updated!"
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err
            });
        });
};

exports.item_delete_item = (req, res) => {
    console.log(req.params.itemId);
    Item.destroy({
    	where: {
    		id: req.params.itemId
    	}
    })
    .then(result => {
            res.status(200).json({
                success: true,
                message: "Item deleted!"
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err
            });
        });
};