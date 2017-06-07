const Handlebars = require('handlebars');
const fs = require('fs');
const _ = require('lodash');

var template = Handlebars.compile(fs.readFileSync('./index.html').toString());
var contexts = JSON.parse(fs.readFileSync('./content.json'));

_.forEach(contexts, function(context) {
  console.log(context)
  context.filename
  context.body
  fs.writeFile(
    context.filename,
    template(context.body),
    function(err) {
      if(err) {
        return console.log(err);
      } 
      console.log("created landing page "+context.filename);
    }); 
  console.log("==========")
});