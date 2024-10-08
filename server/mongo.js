import { MongoClient } from "mongodb"

const MongoDBclient = new MongoClient('mongodb://localhost:27017')
const users = MongoDBclient.db('testdb').collection('users')
const attendanse = MongoDBclient.db('testdb').collection('attendanse')
const organization = MongoDBclient.db('testdb').collection('organization')
const objects = MongoDBclient.db('testdb').collection('objects')
const works = MongoDBclient.db('testdb').collection('works')
const units = MongoDBclient.db('testdb').collection('units')
const jobs = MongoDBclient.db('testdb').collection('jobs')
const auth = MongoDBclient.db('testdb').collection('auth')
const customer = MongoDBclient.db('testdb').collection('customer')
const order = MongoDBclient.db('testdb').collection('order')
const material = MongoDBclient.db('testdb').collection('material')
const warehouse = MongoDBclient.db('testdb').collection('warehouse')
const nomenclature = MongoDBclient.db('testdb').collection('nomenclature')
export { MongoDBclient, users, attendanse, organization, objects, works, units, jobs, auth, customer, order, material, warehouse, nomenclature }
