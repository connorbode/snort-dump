
// imports
var Sequelize = require('sequelize');
var Snort = require('./snort.js');
var snort;

// get db connection infomartion
var db_connection_file = process.argv[2];
var db_connection_info;
try {
  db_connection_info = require(db_connection_file);
} catch (err) {
  console.log("Couldn't find the db connection file");
  process.exit(0);
}

// start db connection
sequelize = new Sequelize(db_connection_info.db, db_connection_info.username, db_connection_info.password, db_connection_info.sequelize);
sequelize
  .authenticate()
  .complete(function (err) {
    if (!!err) {
      console.log("Unable to connect to db");
    } else {
      snort = new Snort(sequelize);
      if (process.argv[3]) {
        snort
          .init(db_connection_info.table)
          .success(function () {
            console.log("db initialized");
          });
      } else {
        run();
      }
    }
  });


// init db if necessary
function init (table) {
  snort.init(table);
}


// process stdin
function run () {
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