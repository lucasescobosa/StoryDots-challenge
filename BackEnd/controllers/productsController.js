const db = require('../database/models');

const productsController = {

    index: async (req, res) => {
        try{
			const products = await db.Product.findAll({
				include: [{
							association: 'brands'
						}],
			})
			if(!products) {
				res.status(404).json({error: 'No items'});
				return
			};
			res.json(products)

		} catch(e) {
      		res.status(500).json({ error: 'Could not connect to database'})
		}
    },

    detail: async (req, res) => {
        try{
			const item = await db.Product.findByPk(req.params.id , {
				include: [{
                    association: 'brands'
                }],
			})
			if(!item) {
				res.status(404).json({error: 'No item'});
				return
			};
			res.json(item)

		} catch(e) {
      		res.status(500).json({ error: 'Could not connect to database'})
		}   
    },

    create: async (req, res) => {
		try {
			const product = await db.Product.create({
				name : req.body.name,
				description : req.body.description,
				image_url : req.body.image_url,
				price : parseInt(req.body.price),
                brand_id : parseInt(req.body.brand_id),
			});	
			res.json('Successful')

		} catch(e) {
			res.status(500).json({ error: e })
		}
    },
    update: async(req, res) => {
        try {
            const product = await db.Product.update({
                name : req.body.name,
                description : req.body.description,
                image_url : req.body.image_url,
                price : parseInt(req.body.price),
                brand_id : parseInt(req.body.brand_id),
            },{
                where: {
                    id: req.params.id
                }
            });
            res.json('Successful')
        } catch(e) {
            res.status(500).json({ error: e })
        }
    },
    remove: async(req, res) => {
        try {
            const product = await db.Product.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json('Successful')
        } catch(e) {
            res.status(500).json({ error: e })
        }
    
    }
}

module.exports = productsController;