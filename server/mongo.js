import { MongoClient } from "mongodb"

const MongoDBclient = new MongoClient('mongodb://localhost:27017')
const users = MongoDBclient.db('testdb').collection('users')
const attendanse = MongoDBclient.db('testdb').collection('attendanse')
const organization = MongoDBclient.db('testdb').collection('organization')

export {MongoDBclient,users,attendanse,organization}
