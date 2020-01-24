const path = require('path');

module.exports = path.dirname(process.mainModule.filename);

// give us the path to the file that is responsible for the fact our application 
// this filename is what we put into dirname to get a path to that directory.
