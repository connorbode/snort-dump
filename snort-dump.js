
// get db connection
var db_connection_file = process.argv[2];
var db_connection_info;
try {
  db_connection_info = require(db_connection_file);
} catch (err) {
  console.log("Couldn't find the db connection file");
  process.exit(0);
}

