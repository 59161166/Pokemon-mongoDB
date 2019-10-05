const mongoClient = require("mongodb").MongoClient
const ObjectID = require("mongodb").ObjectID
const DB_URL = "mongodb+srv://superadmin:minda@cluster0-biyte.gcp.mongodb.net/admin?retryWrites=true&w=majority"
const DB_NAME = "example"
var collection, database
const option = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

class Pokemon {
    constructor(name, primaryType) {
        this.name = name
        this.primaryType = primaryType
        this.secondaryType = null
    }
    echo() {
        console.log(`This is ${this.name} primary is ${this.primaryType}`)
    }
}

function createPokemon(name, type) {
    let p = new Pokemon(name, type)
    return p
}

function isPokemonExisted(id) {
    return poks[id] !== undefined
}

async function editPokemon(id, name, type, type2) {

    var client = await mongoClient.connect(DB_URL, option).catch((err) => console.log(err))
    database = client.db(DB_NAME)
    collection = database.collection('pokemon')
    try {
        var result = await collection.update({'_id':ObjectID(id)},{ name: name, primaryType: type, secondaryType: type2 })
        console.log(result.nModified)
        if(result.nModified === 0){
            return false
        }
        return true
    } catch (nModified) {
        console.log(err)
        return false
    } finally {
        client.close()
    }

}

async function deletePokemon(id) {
    // delete poks[id]
    // return true
    var client = await mongoClient.connect(DB_URL, option).catch((err) => console.log(err))
    database = client.db(DB_NAME)
    collection = database.collection('pokemon')
    try {
        var result = await collection.remove({'_id':ObjectID(id)})
        return true
    } catch (err) {
        console.log(err)
        return false
    } finally {
        client.close()
    }
}

var poks = []

async function savePokemon(name, type) {
    let p = createPokemon(name, type)
    var client = await mongoClient.connect(DB_URL, option).catch((err) => console.log(err))
    database = client.db(DB_NAME)
    collection = database.collection('pokemon')
    try {
        var result = await collection.insert(p)
        return true
    } catch (err) {
        console.log(err)
        return false
    } finally {
        client.close()
    }
}

async function getPokemon(id) {
    var client = await mongoClient.connect(DB_URL, option).catch((err) => console.log(err))
    database = client.db(DB_NAME)
    collection = database.collection('pokemon')
    try {
        var result = await collection.find({'_id':ObjectID(id)} ).toArray() 
        return result
    } catch (err) {
        console.log(err)
        return 
    } finally {
        client.close()
    }
}

async function getAllPokemon() {
    // var client = await getCollection('pokemon')
    var client = await mongoClient.connect(DB_URL, option).catch((err) => console.log(err))
    database = client.db(DB_NAME)
    collection = database.collection('pokemon')
    try {
        var result = await collection.find( {} ).toArray()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
        return 
    } finally {
        client.close()
    }
}

async function getCollection(colName){
    var client = await mongoClient.connect(DB_URL, option).catch((err) => console.log(err))
    database = client.db(DB_NAME)
    collection = database.collection(colName)
}
// function isSufficientParam(v) {
//     return v !== undefined && v !== null && v !== ''
// }

module.exports.savePokemon = savePokemon
module.exports.getPokemon = getPokemon
module.exports.isPokemonExisted = isPokemonExisted
module.exports.editPokemon = editPokemon
module.exports.getAllPokemon = getAllPokemon
module.exports.deletePokemon = deletePokemon