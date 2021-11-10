/* eslint-disable */
// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'com.meteor.coastar',
  name: 'Coastar',
  version: "0.0.1"
});

App.icons('icons/turtle.jpg');
// For dev testing, remove for deploy
App.appendToConfig(`
    <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
        <application android:usesCleartextTraffic="true"></application>
    </edit-config>
`);
