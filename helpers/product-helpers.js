var db = require('../config/connection')
var collection = require('../config/collections')
const async = require('hbs/lib/async')
var objectId = require('mongodb').ObjectId
//const { reject } = require('bcrypt/promises')

module.exports = {
    addProduct: (product, callback) => {
        console.log(product)
        db.get().collection('product').insertOne(product).then((data) => {
            console.log(data)
            callback(data.insertedId)


        })
    },
    getAllProducts: () => {
        return new Promise(async(resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)

        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
                console.log(response);
                resolve(response)
                
            })
        })
    }
}