import { MongoClient } from "mongodb"

const MongoDBclient = new MongoClient('mongodb://localhost:27017')
const users = MongoDBclient.db('testdb').collection('users')
const attendanse = MongoDBclient.db('testdb').collection('attendanse')
const organization = MongoDBclient.db('testdb').collection('organization')
const objects = MongoDBclient.db('testdb').collection('objects')
const works = MongoDBclient.db('testdb').collection('works')
const units = MongoDBclient.db('testdb').collection('units')
export {MongoDBclient,users,attendanse,organization,objects,works,units}
