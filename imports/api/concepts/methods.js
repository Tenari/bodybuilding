import { Meteor } from 'meteor/meteor';
import { Concepts } from './concepts.js';

Meteor.methods({
  'concepts.add'(data){
    const parentObj = Concepts.findOne(data.parentId);
    const id = Concepts.insert({
      name: data.name,
      text: data.text,
    });
    Concepts.update(parentObj._id, {$push: {childIds: id}});
    return id;
  },
  'concepts.dump'(){
    // cat private/concepts.json | jq '.' > tmp.json && mv tmp.json private/concepts.json
    const fs = Npm.require( 'fs' ) ;
    let __ROOT_APP_PATH__ = fs.realpathSync('.');
    console.log(__ROOT_APP_PATH__);
    const extra = '.meteor/local/build/programs/server';
    const path = __ROOT_APP_PATH__.slice(0,-1*extra.length) + '/private/concepts.json';
    var blob = JSON.stringify(Concepts.find({}).fetch());
    var buffer = new Buffer(blob) ;
    fs.writeFileSync( path, buffer ) ;
  }
})
