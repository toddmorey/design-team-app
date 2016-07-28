// utils
var basename = require('path').basename;
var debug = require('debug')('metalsmith-algolia');
var dirname = require('path').dirname;
var extname = require('path').extname;

// algolia
var algoliasearch = require('algoliasearch');
var client = algoliasearch('L4D4Y2MM4X', '1d37675f552002dafbe4fb64aa071d23');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

/**
 * Metalsmith plugin to hide drafts from the output.
 *
 * @return {Function}
 */

function plugin(){
  return function(files, metalsmith, done){
    debug('starting plugin...');
    setImmediate(done);

    index = client.initIndex('ambitious');

    Object.keys(files).forEach(function(file){

      if (!isHTML(file)) return;
      if (!("title" in files[file])) return;

      var data = files[file];
      // update the record with objectID="myID1"
      // the record is created if it doesn't exist
      index.saveObject({
        title: data.title,
        objectID: data.path
      }, function(err, content) {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(content);
      });
    });
  };
}


/**
 * Check if a `file` is html.
 *
 * @param {String} file
 * @return {Boolean}
 */

function isHTML(file){
  return /\.html|\.htm/.test(extname(file));
}
