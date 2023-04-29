module.exports = function(sequelize, dataTypes) {
    const alias = 'Brand';
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
        logo_url: {	
            type: dataTypes.STRING(500),
            allowNull: false,
        }
    }
    const config = {
        tableName: 'brands',
        timestamps: false
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {
        Product.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'brand_id'
        })
    }

    return Product;
}