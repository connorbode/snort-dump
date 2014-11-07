
function Snort (conn) {

  // regexs
  var regex = {
    id: /\[([0-9]+:[0-9]+:[0-9]+)\]/
  };

  // contents for the next sql statement
  var currentStatement;

  // functions
  this.process = process;


  // process some input
  function process (input) {
    var lines = input.split('\n');
    var i;
    resetStatement();
    for (i = 0; i < lines.length; i++) {
      processLine(lines[i]);
    }
  }

  // process a single line
  function processLine (line) {
    if (isNewline(line)) {
      executeStatement();
      return;
    }
    matchID(line);
  }

  // checks if a line is a newline
  function isNewline (line) {
    return line == '';
  }

  // resets the current statement
  function resetStatement () {
    currentStatement = {
      id: "",
      desc: "",
      classification: "",
      priority: "",
      ttl: "",
      src: "",
      dest: ""
    };
  }

  // executes the pending statement
  function executeStatement () {
    console.log(currentStatement);
    resetStatement();
  }

  // checks the line for an event ID
  function matchID (line) {
    var match = regex.id.exec(line);
    if (match) {
      currentStatement.id = match[1];
    }
  }
}

module.exports = Snort;