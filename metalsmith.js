// Metalsmith tasks
var Metalsmith = require('metalsmith'),
    algolia = require('./modules/algolia-index.js'),
    drafts = require('metalsmith-drafts'),
    markdown = require('metalsmith-markdown'),
    inplace = require('metalsmith-in-place'),
    layouts = require('metalsmith-layouts'),
    watch = require('metalsmith-watch'),
    nunjucks = require('nunjucks'),
    extender = require('./modules/metalsmith-extends.js'),
    permalinks = require('metalsmith-permalinks'),
    json = require('metalsmith-json-to-files'),
    define = require('metalsmith-define'),
    api = require('metalsmith-json-api'),
    msriot = require('./modules/metalsmith-riot.js'),
    mingo = require('metalsmith-mingo'),
    when = require('metalsmith-if'),
    collections = require('metalsmith-collections');

// removes caching from nunjucks
var env = nunjucks.configure({noCache : true});

// build command that runs metalsmith
function build(mode, callback) {
  Metalsmith(__dirname)
    .source('./content')
    .destination('./build')
    .use(json({
      "source_path": "./json/"
    }))
    .use(collections({
       "projects": {},
       "updates": {},       
    }))
    .use(permalinks({
       pattern: ':title',
       relative: false
     }))
    // .use(algolia())
    .use(mingo())
    .use(inplace('nunjucks'))
    .use(layouts('nunjucks'))
    .use(when((mode === 'dev'), // run the watch plugin only in dev mode
      watch({
        paths: {
          "${source}/**/*.*": true,
          "layouts/**/*": "**/*"
        },
        livereload: false,
      })
    ))
    .build(function(err){
      if (err){
        throw err;
      }
      callback();
    });
}

module.exports = build;
