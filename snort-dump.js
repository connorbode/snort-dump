
// imports
var Sequelize = require('sequelize');
var Snort = require('./snort.js');

// get db connection infomartion
var db_connection_file = process.argv[2];
var db_connection_info;
try {
  db_connection_info = require(db_connection_file);
} catch (err) {
  process.stdout.write("Couldn't find the db connection file");
  process.exit(0);
}

// start db connection
sequelize = new Sequelize(db_connection_info.db, db_connection_info.username, db_connection_info.password, {
    dialect: db_connection_info.dialect,
    port: db_connection_info.port
  });

sequelize
  .authenticate()
  .complete(function (err) {
    if (!!err) {
      console.log("Unable to connect to db");
    } else {
      run();
    }
  });


// process stdin
function run () {
  var snort = new Snort(sequelize);
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      snort.process(chunk);
    }
  });
  process.stdin.on('end', function () {
    process.stdout.write('end');
  });
}