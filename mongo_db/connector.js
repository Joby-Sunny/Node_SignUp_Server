/* Importing MONGOOSE the mongo db_client */
var mongoose = require('mongoose');
/* Connecting/Connecting to the database */
const db_name = 'test';
mongoose.connect(`mongodb://localhost/${db_name}`, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to Database:${db_name}`);
})

/* importing a the schema for the collection[table] */
const schema  = new mongoose.Schema(require('./schema'));

/* creating the collection[table] inside which we need to insert */
var signup_table = mongoose.model('signup',schema); 

/* exporting the collection endpoint */
module.exports = signup_table;