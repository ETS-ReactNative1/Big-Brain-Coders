import { Meteor } from 'meteor/meteor';

export const updateText = {
  name: 'maps.getAPI',

  // Factor out Method body so that it can be called independently (3)
  run() {
    Meteor.

    Todos.update(todoId, {
      $set: { text: newText }
    });
  },

  // Call Method by referencing the JS object (4)
  // Also, this lets us specify Meteor.apply options once in
  // the Method implementation, rather than requiring the caller
  // to specify it at the call site.
  call(args, callback) {
    const options = {
      returnStubValue: true,     // (5)
      throwStubExceptions: true  // (6)
    }

    Meteor.apply(this.name, [args], options, callback);
  }
};

// Actually register the method with Meteor's DDP system
Meteor.methods({
  [updateText.name]: function (args) {
    updateText.validate.call(this, args);
    updateText.run.call(this, args);
  }
})
