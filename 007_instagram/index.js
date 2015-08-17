var Instagram = require('instagram-node-lib');
var fs = require('fs');

Instagram.set('client_id', '* my id *');
Instagram.set('client_secret', '* my secret *');

Instagram.media.search({
  lat: 35.6582555,
  lng: 139.700862,
  distance: 1000,
  complete: function (data, pagenation) {
    var text = JSON.stringify(data);
    fs.writeFileSync('result.json', text, 'utf-8');
  },
  error: function (errorMessage, errorObject, caller) {
  }
});