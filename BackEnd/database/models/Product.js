module.exports = function(sequelize, dataTypes) {
    const alias = 'Product';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(500),
            allowNull: false,
        },
        image_url: {	
            type: dataTypes.STRING(500),
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        brand_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    }
    const config = {
        tableName: 'products',
        timestamps: false
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {
        Product.belongsTo(models.Brand, {
            as: 'brands',
            foreignKey: 'brand_id'
        })
    }

    return Product;
}