var requestify = require('requestify');
var config = require('../config/fieldbook.js');

var bookId = '57957d9f1b272b03001596b3';
var baseUrl = 'https://api.fieldbook.com/v1/' + bookId;
var options = {
    headers: {accept: 'application/json'},

    auth: {
        username: config.USER,
        password: config.PASSWORD
    }
};

var jsonfile = require('jsonfile')

var url = baseUrl + '/projects';

// Pull  projects
requestify.get(url, options)
  .then(function(response) {
      jsonfile.writeFile('json/projects.json', response.getBody(), function (err) {
        if(err) console.error(err)
      })
  }
);

url = baseUrl + '/updates';

// Pull  updates
requestify.get(url, options)
  .then(function(response) {
      jsonfile.writeFile('json/updates.json', response.getBody(), function (err) {
        if(err) console.error(err)
      })
  }
);