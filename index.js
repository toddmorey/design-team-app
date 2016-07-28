var Metalsmith = require('metalsmith'),
    drafts = require('metalsmith-drafts'),
    branch = require('metalsmith-branch'),
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

// removes caching from nunjucks
var env = nunjucks.configure({noCache : true});

Metalsmith(__dirname)
  .source('./content')
  .destination('./build')
  .use( branch('projects/*')
      .use(inplace('nunjucks'))
      .use(layouts('nunjucks'))
      .use(permalinks({ relative: false }))
      .use(
        watch({
          paths: {
            "${source}/**/*.*": true,
            "layouts/**/*": "**/*"
          },
          livereload: false,
        })
      )
  )
  .use( branch('index.html')
      .use(inplace('nunjucks'))
      .use(layouts('nunjucks'))
      .use(permalinks({ relative: false }))
      .use(
        watch({
          paths: {
            "${source}/**/*.*": true,
            "layouts/**/*": "**/*"
          },
          livereload: false,
        })
      )
  )
  .build(function(err){
    if (err){
      throw err;
    }
  });
