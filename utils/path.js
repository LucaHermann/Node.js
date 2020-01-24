const path = require('path');

module.exports = path.dirname(process.mainModule.filename);

// this function give us the path to the file that is responsible of our application 
// this filename is what we put into dirname to get a path to that directory.
