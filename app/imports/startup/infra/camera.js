import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (!Meteor.isCordova) {
    return;
  }
  // document.addEventListener("deviceready", onDeviceReady, false);
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    console.log(navigator.camera);
  }
});
